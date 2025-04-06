import uniq from "lodash/uniq";
import { sendTransactionalEmail } from "@/lib";
import { emailGroups } from "@/constants";
import { hasRole, hasAccountType, hasAccountStatus } from "@/lib";
import { Title, AccountStatus, AccountType, Role } from "@/types/enums";

const messaging = {
  queries: {
    async getMessageRecipients(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      const { user } = ctx;
      const members = [
        AccountType.FULL,
        AccountType.ASSOCIATE,
        AccountType.EMERITUS,
      ];

      const query = {
        where: {},
        orderBy: "firstName_ASC",
      };

      if (!hasAccountStatus(user, [AccountStatus.ACTIVE], false)) {
        return [];
      }

      if (hasRole(user, [Role.ADMIN, Role.OFFICER], false)) {
        query.where = { accountType_in: Object.keys(AccountType) };
      } else if (hasAccountType(user, members, false)) {
        query.where = {
          AND: [
            { accountStatus: AccountStatus.ACTIVE },
            { accountType_in: members },
          ],
        };
      } else {
        return [];
      }

      // @TODO make it work
      const results = await ctx.db.select("*").from("user").where("");
      // const results = await ctx.db.query.users(query, info);

      // Sort by lastName then firstName
      results.sort((a: any, b: any) => (a.lastName > b.lastName ? 1 : -1));

      return results;
    },
  },
  mutations: {
    async sendMessage(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Requesting user has proper account status?
      const { user } = ctx;

      const { to, subject, htmlText } = args;

      if (to.length === 0) {
        throw new Error("No recipients found");
      }

      // Can email ALL users
      if (to.includes("all_users")) {
        hasRole(user, [Role.ADMIN]);
        hasAccountStatus(user, [AccountStatus.ACTIVE]);
        hasAccountType(user, [AccountType.FULL]);
      }

      // Can email guests or full members
      if (
        to.includes("guests") ||
        to.includes("all_active") ||
        to.includes("full_membership")
      ) {
        // Is active full member and at least an officer
        hasRole(user, [Role.ADMIN, Role.OFFICER]);
        hasAccountStatus(user, [AccountStatus.ACTIVE]);
        hasAccountType(user, [AccountType.FULL]);
      }

      // Can email run leaders
      if (to.includes("run_leaders")) {
        // Is active full member and at least the Run Master
        hasRole(user, [Role.ADMIN, Role.OFFICER, Role.RUN_MASTER]);
        hasAccountStatus(user, [AccountStatus.ACTIVE]);
        hasAccountType(user, [AccountType.FULL]);
      }

      // Can email multiple individual members
      if (
        (!to.includes("officers") || !to.includes("webmaster")) &&
        !to.some((subject: any) => subject === emailGroups) &&
        to.length > 1
      ) {
        // Is active full or emeritus and at least a run leader
        hasRole(
          user,
          Object.keys(Role).filter((role: string) => role !== Role.USER),
        );
        hasAccountStatus(user, [AccountStatus.ACTIVE]);
        hasAccountType(user, [AccountType.FULL, AccountType.EMERITUS]);
      }

      // Can email individual members
      if (
        (!to.includes("officers") || !to.includes("webmaster")) &&
        !to.some((subject: any) => subject === emailGroups)
      ) {
        // Is active full or emeritus
        hasAccountStatus(user, [AccountStatus.ACTIVE]);
        hasAccountType(user, [
          AccountType.FULL,
          AccountType.EMERITUS,
          AccountType.ASSOCIATE,
        ]);
      }

      // Can email Run Master
      if (to.includes("runmaster")) {
        // Is active member
        hasAccountStatus(user, [AccountStatus.ACTIVE]);
      }

      // Anyone logged in can email the officers or the webmaster

      interface EmailSettings {
        from: string;
        subject: string;
        html: string;
        to: string[];
        bcc?: string[];
        preheader?: string;
      }

      const emailSettings: EmailSettings = {
        from: user.email,
        subject: `${subject || `Message from ${user.firstName}`}`,
        // text,
        html: htmlText,
        to: [],
        bcc: [],
      };

      if (
        to.length === 1 &&
        !emailGroups.some((recipient) => recipient === to[0])
      ) {
        // Send email to one person
        const [email] = await ctx.db
          .select("email")
          .from("user")
          .where({ username: to[0] })
          .limit(1);

        emailSettings.to.push(email);
      } else {
        // Send email to many people

        // To do: handle duplicates, if any
        // let query = {
        //   where: {
        //     OR: peopleQueries,
        //   },
        // };

        // if (groupQueries.length) {
        //   query = {
        //     where: {
        //       OR: [...query.where["OR"], ...groupQueries],
        //     },
        //   };
        // }

        const groupEmailAddrs = to
          .filter((recipient: any) => emailGroups.includes(recipient))
          .map(async (group: any) => {
            switch (group) {
              case "officers":
                return ctx.db
                  .select("username")
                  .from("user")
                  .where("office", "NOT", null);
              case "runmaster":
                return ctx.db
                  .select("username")
                  .from("user")
                  .where({ role: Role.RUN_MASTER });
              case "webmaster":
                return ctx.db
                  .select("username")
                  .from("user")
                  .where({ title: Title.WEBMASTER });
              case "run_leaders":
                return ctx.db
                  .select("username")
                  .from("user")
                  .where({ role: Role.RUN_LEADER });
              case "full_membership":
                return ctx.db
                  .select("username")
                  .from("user")
                  .where({ accountStatus: AccountStatus.ACTIVE })
                  .andWhere((qb) => {
                    qb.where({ accountType: AccountType.FULL })
                      .orWhere({ accountType: AccountType.EMERITUS })
                      .orWhere({ accountType: AccountType.ASSOCIATE });
                  });
              case "all_active":
                return ctx.db
                  .select("username")
                  .from("user")
                  .where({ accountStatus: AccountStatus.ACTIVE });
              case "all_users":
                return ctx.db
                  .select("username")
                  .from("user")
                  .where("email", "NOT", null);
              case "all_guests":
                return ctx.db
                  .select("username")
                  .from("user")
                  .where({ accountType: AccountType.GUEST })
                  .andWhere({ accountStatus: AccountStatus.ACTIVE });
              default:
                return;
            }
          });

        const peopleEmailAddrs = to.filter(
          (recipient: any) => !emailGroups.includes(recipient),
        );

        const emailAddrs = await ctx.db
          .select("email")
          .from("user")
          .where((qb) => {
            if (groupEmailAddrs && groupEmailAddrs.length > 0) {
              qb.whereIn(
                "username",
                uniq([...groupEmailAddrs, ...peopleEmailAddrs]),
              );
            } else {
              qb.whereIn("username", peopleEmailAddrs);
            }
          });

        if (emailAddrs && emailAddrs.length > 1) {
          emailSettings.to.push("info@4-playersofcolorado.org");
          emailSettings.bcc?.concat(
            emailAddrs.map((email: any) => email.email),
          );
        } else {
          emailSettings.to.push(user.email);
        }
      }

      if (emailSettings.to.length >= 1) {
        return sendTransactionalEmail(emailSettings)
          .then(() => ({ message: "Message has been sent" }))
          .catch((err) => {
            throw new Error(err.toString());
          });
      }

      throw new Error("No email addresses found for recipient(s)");
    },
  },
};

export default messaging;
