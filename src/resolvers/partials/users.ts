import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { promisify } from "util";
import cuid from "@bugsnag/cuid";
import cookie, { type SerializeOptions } from "cookie";

import {
  hasRole,
  hasAccountType,
  hasAccountStatus,
  convertKeysToSnakeCase,
  sendTransactionalEmail,
  getHash,
  getSecretaryNewUserEmail,
  getUserNewAccountEmail,
  getUserWelcomeEmail,
  getUserWebsiteRegistrationEmail,
  getUserEventRegistrationEmail,
  getUserAdminRegistrationEmail,
  getUserResetTokenEmail,
  getUserRejectionEmail,
  convertKeysToCamelCase,
} from "@/lib";
import {
  accountCreated,
  accountUnlocked,
  accountRejected,
} from "@/lib/membership-log";
import { resetTokenTimeoutInMs, yearInMs } from "@/constants";
import {
  AccountStatus,
  AccountType,
  MembershipMessageCode,
  Role,
} from "@/types/enums";
import { getMyself } from "@/data";
import { isDev } from "@/lib/";

const promisifiedRandomBytes = promisify(randomBytes);

const defaultTokenSettings: Partial<SerializeOptions> = {
  httpOnly: true,
  secure: !isDev,
  sameSite: isDev ? "lax" : "none",
};

const validTokenSettings: Partial<SerializeOptions> = {
  ...defaultTokenSettings,
  maxAge: yearInMs,
};

const expiredTokenSettings: Partial<SerializeOptions> = {
  ...defaultTokenSettings,
  maxAge: -1,
};

const users = {
  queries: {
    myself(parent: unknown, args: any, ctx: ExtraContext) {
      console.log("user", ctx.user);
      // Check if there is a current user
      if (!ctx?.user?.id) {
        // console.log("user", ctx.user.id);
        return null;
      }

      return getMyself(ctx.user.id);
    },
    async users(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }
      // Requesting user has proper account type?
      hasAccountType(ctx.user, [
        AccountType.FULL,
        AccountType.ASSOCIATE,
        AccountType.EMERITUS,
      ]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      // If they do, query all the users
      const getFilteredItems = async (args: any) => {
        return ctx.db
          .select("*")
          .from("user")
          .where((qb) => {
            if (args.role) {
              qb.where("role", "=", args.role);
            }

            if (args.accountStatus) {
              qb.orWhere("accountStatus", "=", args.accountStatus);
            }

            if (args.accountType) {
              qb.orWhere("accountType", "=", args.accountType);
            }

            if (args.office) {
              qb.orWhere("office", "=", args.office);
            }

            if (args.title) {
              qb.orWhere("title", "=", args.title);
            }

            qb.orderBy("last_name ASC");
          });
      };

      // query.where = {
      //   AND: [
      //     { accountType_in: args.accountType, },
      //     { accountStatus_in: args.accountStatus, },
      //     { role_in: args.role, },
      //     { office_in: args.office, },
      //     { title_in: args.title, },
      //   ],
      // };

      // Sorting?
      // if (args.orderBy && args.orderBy.length > 0) {
      //   query.orderBy = args.orderBy[0];
      // }

      const results = await getFilteredItems(args);
      results.sort((a: any, b: any) => (a.firstName > b.firstName ? 1 : -1));
      return results;
    },
    async user(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      const username =
        !args.username || args.username === "self"
          ? ctx.user.username
          : args.username;

      if (username !== ctx.user.username) {
        // Requesting user has proper account type?
        hasAccountType(ctx.user, [
          AccountType.FULL,
          AccountType.ASSOCIATE,
          AccountType.EMERITUS,
        ]);

        // Requesting user has proper account status?
        hasAccountStatus(ctx.user, [
          AccountStatus.ACTIVE,
          AccountStatus.PAST_DUE,
        ]);
      }

      // If they do, query the user
      const user = await ctx.db
        .select("*")
        .from("user")
        .where("username", "=", username);

      if (user) {
        return user;
      } else {
        throw new Error("User cannot be found");
      }
    },
    async getRegistration(parent: unknown, args: any, ctx: ExtraContext) {
      const registration = await ctx.db
        .select("registration")
        .where("token", "=", args.token)
        .andWhere(
          "token_expiry",
          ">=",
          new Date(Date.now() - resetTokenTimeoutInMs).toISOString(),
        )
        .limit(1);

      if (!registration) {
        throw new Error("Token invalid or expired, please register again.");
      }

      if (registration.length <= 0) {
        throw new Error("Registration invalid, please register again.");
      }

      return registration[0];
    },
    async getDuesLastReceived(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }
      // Requesting user has proper role?
      hasRole(ctx.user, [Role.ADMIN, Role.OFFICER]);

      // Requesting user has proper account type?
      hasAccountType(ctx.user, [AccountType.FULL]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      // If they do, query the user
      const results = await ctx.db
        .select("*")
        .from("membership_log_item")
        .where((qb) =>
          args.username === "self"
            ? qb.where({ id: ctx?.user?.id })
            : qb.where({ username: args.username }),
        )
        .andWhere("message_code", "=", MembershipMessageCode.DUES_PAID)
        .orderBy("created_at DESC")
        .limit(1);

      return { time: results.length > 0 ? results[0].time : null };
    },
    async getOfficer(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account type?
      hasAccountType(ctx.user, [
        AccountType.FULL,
        AccountType.ASSOCIATE,
        AccountType.EMERITUS,
      ]);

      // // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      // If they do, query the officer
      const results = await ctx.db
        .select("*")
        .from("user")
        .where("office", "=", args.office);

      return results.length > 0 ? results[0] : {};
    },
    async getMembers(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }
      // Requesting user has proper account type?
      hasAccountType(ctx.user, [
        AccountType.FULL,
        AccountType.ASSOCIATE,
        AccountType.EMERITUS,
      ]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      // If they do, query all the members
      const results = await ctx.db
        .select("*")
        .from("user")
        .where((qb) => {
          [...args.accountStatuses, AccountStatus.ACTIVE].map(
            (accountStatus: string) => {
              qb.orWhere("account_status", "=", accountStatus);
            },
          );
        })
        .andWhere((qb) => {
          args.accountTypes.map((accountType: string) => {
            qb.orWhere("account_type", "=", accountType);
          });
        })
        .andWhere("office", "IS", null)
        .andWhere("rig", "IS NOT", null)
        .orderBy("first_name ASC");

      // Sort by lastName then firstName
      results.sort((a: any, b: any) => (a.lastName > b.lastName ? 1 : -1));

      return results;
    },
    async getRunLeaders(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper role?
      hasRole(ctx.user, [Role.ADMIN, Role.OFFICER, Role.RUN_MASTER]);

      // Requesting user has proper account type?
      hasAccountType(ctx.user, [AccountType.FULL]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      // Return all run leaders
      const results = await ctx.db
        .select("*")
        .from("user")
        .where((qb) => {
          [Role.ADMIN, Role.OFFICER, Role.RUN_MASTER, Role.RUN_LEADER].map(
            (role: string) => {
              qb.orWhere("role", "=", role);
            },
          );
        })
        .andWhere("account_status", "=", AccountStatus.ACTIVE)
        .andWhere("account_type", "=", AccountType.FULL)
        .orderBy("first_name ASC");

      // Sort by lastName then firstName
      results.sort((a: any, b: any) => (a.lastName > b.lastName ? 1 : -1));

      return results;
    },
  },
  mutations: {
    async register(parent: unknown, args: any, ctx: ExtraContext) {
      const { firstName, lastName, email, confirmEmail, source } = args;

      // VALIDATION
      if (!email) {
        throw new Error("Email is required");
      }

      if (!confirmEmail) {
        throw new Error("Email confirmation is required");
      }

      const lowercaseEmail = email.toLowerCase();
      const lowercaseConfirmEmail = confirmEmail.toLowerCase();

      if (lowercaseEmail !== lowercaseConfirmEmail) {
        throw new Error("Emails do not match");
      }

      if (!firstName) {
        throw new Error("Must include a first name");
      }

      if (!lastName) {
        throw new Error("Must include a last name");
      }

      // Create registration in database
      const resetToken = (await promisifiedRandomBytes(20)).toString("hex");

      await ctx.db("registration").insert({
        first_name: firstName,
        last_name: lastName,
        email: lowercaseEmail,
        source,
        token: resetToken,
        token_expiry: new Date(
          Date.now() + resetTokenTimeoutInMs,
        ).toISOString(),
      });

      let emailDetails;

      switch (source) {
        case "website": // User initiated
          emailDetails = getUserWebsiteRegistrationEmail({
            email: lowercaseEmail,
            firstName,
            lastName,
            resetToken,
          });
          break;
        case "run": // User attended run
        case "meeting": // User attended meeting
          emailDetails = getUserEventRegistrationEmail({
            email: lowercaseEmail,
            firstName,
            lastName,
            resetToken,
          });
          break;
        case "admin": // Admin invited user directly
        default:
          emailDetails = getUserAdminRegistrationEmail({
            email: lowercaseEmail,
            firstName,
            lastName,
            resetToken,
            inviter: ctx?.user?.firstName,
          });
      }

      // Email reset token
      return sendTransactionalEmail(emailDetails)
        .then(() => ({
          message: "Registration was successful. Please check your email.",
        }))
        .catch((err) => {
          //Extract error msg
          // const { message, code, response } = err;

          //Extract response msg
          // const { headers, body } = response;

          throw new Error(err.toString());
        });
    },
    async signUp(parent: unknown, args: any, ctx: ExtraContext) {
      const email = args.email.toLowerCase();

      // VALIDATION
      if (!args.firstName) {
        throw new Error("Must include a first name");
      }

      if (!args.lastName) {
        throw new Error("Must include a last name");
      }

      if (!args.username) {
        throw new Error("Must include a username");
      }

      if (!args.password) {
        throw new Error("Must include a password");
      }

      // Hash the password
      const password = await getHash(args.password);

      const { token, firstName, lastName, username, ...newUser } = args;

      // Create user in database
      try {
        const id = cuid();

        // Create new user
        await ctx.db("user").insert({
          ...convertKeysToSnakeCase(newUser),
          id,
          email: email.toLowerCase(),
          first_name: firstName,
          last_name: lastName,
          username: username.toLowerCase(),
          password,
          last_login: new Date().toISOString(),
        });

        await Promise.all([
          // Create corresponding log entry
          ctx.db("membership_log_item").insert(accountCreated(id)),
          // Remove registration from database
          ctx.db("registration").where({ token }).delete(),
        ]);

        // Send email to secretary/VP
        return sendTransactionalEmail(getSecretaryNewUserEmail(username))
          .then(() =>
            sendTransactionalEmail(
              getUserNewAccountEmail({
                firstName,
                lastName,
                email: email.toLowerCase(),
                username,
              }),
            ),
          )
          .then(() => ({ message: "Account created" }))
          .catch((err) => {
            //Extract error msg
            // const { message, code, response } = err;

            //Extract response msg
            // const { headers, body } = response;

            throw new Error(err);
          });
      } catch (error: unknown) {
        if (
          // @ts-ignore
          error.message ===
          "A unique constraint would be violated on User. Details: Field name = username"
        ) {
          throw new Error("That username is taken.");
        }

        if (
          // @ts-ignore
          error.message ===
          "A unique constraint would be violated on User. Details: Field name = email"
        ) {
          throw new Error(
            "There is already an account with that email address. Try resetting your password.",
          );
        }

        // @ts-ignore
        throw new Error(error);
      }
    },
    async unlockNewAccount(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper role?
      hasRole(ctx.user, [Role.ADMIN, Role.OFFICER]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const user = await ctx.db
        .select("id", "email", "first_name", "last_name")
        .from("user")
        .where({ id: args.userId });

      const lowercaseEmail = user[0].email.toLowerCase();

      // Update status
      await Promise.all([
        ctx
          .db("user")
          .update({ accountStatus: AccountStatus.ACTIVE })
          .where({ id: args.userId }),
        ctx
          .db("membership_log_item")
          .insert(accountUnlocked(ctx.user.id, args.userId)),
      ]);

      // Send email to user
      return sendTransactionalEmail(
        getUserWelcomeEmail({
          firstName: user[0].first_name,
          lastName: user[0].last_name,
          email: lowercaseEmail,
        }),
      )
        .then(() => ({ message: "Account unlocked" }))
        .catch((err) => {
          //Extract error msg
          // const { message, code, response } = err;

          //Extract response msg
          // const { headers, body } = response;

          throw new Error(err);
        });
    },
    async rejectNewAccount(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper role?
      hasRole(ctx.user, [Role.ADMIN, Role.OFFICER]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const user = await ctx.db
        .select("id", "email", "first_name", "last_name")
        .from("user")
        .where({ id: args.userId });

      const lowercaseEmail = user[0].email.toLowerCase();

      // Update status
      await Promise.all([
        // Update user
        ctx
          .db("user")
          .update({ accountStatus: AccountStatus.REJECTED })
          .where({ id: args.userId }),
        // Create corresponding membership log entry
        ctx
          .db("membership_log_item")
          .insert(accountRejected(ctx?.user?.id, args.userId, args.reason)),
      ]);

      // Send email to user
      return sendTransactionalEmail(
        getUserRejectionEmail({
          firstName: user[0].first_name,
          lastName: user[0].last_name,
          email: lowercaseEmail,
          reason: args.reason,
        }),
      )
        .then(() => ({ message: "Account rejected" }))
        .catch((err) => {
          //Extract error msg
          // const { message, code, response } = err;

          //Extract response msg
          // const { headers, body } = response;

          throw new Error(err);
        });
    },
    async login(parent: string, { email, password }: any, ctx: ExtraContext) {
      // Check if there is a user with that email
      console.log("email", email);
      console.log("password", password);
      const user = await ctx.db
        .select(
          "user.id",
          "user.username",
          "user.password",
          "user_meta.first_login_complete",
        )
        .from("user")
        .innerJoin("_user_meta", "_user_meta.a", "user.id")
        .innerJoin("user_meta", "_user_meta.b", "user_meta.id")
        .where({ email: email.toLowerCase() })
        .limit(1);

      if (!user || user.length === 0) {
        console.log("user", user);
        throw new Error("Username or password incorrect");
      }

      // Check if password is correct
      const valid = await bcrypt.compare(password, user[0].password);

      if (!valid) {
        console.log("valid", valid);
        throw new Error("Username or password incorrect"); // fix
      }

      // Generate the JWT token
      const token = jwt.sign(
        { userId: user[0].id },
        process.env.AUTH_SECRET ?? "",
      );

      // Set the cookie with the token
      ctx.res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, validTokenSettings),
      );

      // Update last login
      await ctx
        .db("user")
        .update({ lastLogin: new Date().toISOString() })
        .where({ id: user[0].id });

      // Return the user
      return { message: "Successfully logged in" };
    },
    logout(parent: unknown, args: any, ctx: ExtraContext) {
      ctx.res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", expiredTokenSettings),
      );
      return { message: "Goodbye" };
    },
    async requestReset(_: any, args: any, ctx: ExtraContext) {
      // Check if this is a real user
      const lowerEmail = args.email.toLowerCase();

      const user = await ctx.db
        .select("id", "first_name", "last_name")
        .from("user")
        .where({ email: lowerEmail });

      if (!user) {
        throw new Error("Invalid email entered");
      }

      // Set reset token and expiry
      const resetToken = (await promisifiedRandomBytes(20)).toString("hex");
      const resetTokenExpiry = new Date(
        Date.now() + resetTokenTimeoutInMs,
      ).toISOString();

      // Update reset values
      await ctx
        .db("user")
        .update({ resetToken, resetTokenExpiry })
        .where({ email: lowerEmail });

      // Email reset token
      return sendTransactionalEmail(
        getUserResetTokenEmail({
          email: lowerEmail,
          firstName: user[0].first_name,
          lastName: user[0].last_name,
          username: user[0].username,
          resetToken,
        }),
      )
        .then(() => ({ message: "Password reset is en route" }))
        .catch((err) => {
          //Extract error msg
          // const { message, code, response } = err;

          //Extract response msg
          // const { headers, body } = response;

          throw new Error(err.toString());
        });
    },
    async resetPassword(parent: unknown, args: any, ctx: ExtraContext) {
      // Check if passwords match
      if (args.password !== args.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Check if token is legit and not expired
      const [user] = await ctx.db
        .select("*")
        .from("user")
        .where("reset_token", "=", args.resetToken)
        .andWhere(
          "reset_token_expiry",
          ">=",
          new Date(Date.now() - resetTokenTimeoutInMs).toISOString(),
        );

      if (!user) {
        throw new Error("Token invalid or expired");
      }

      // Hash the new password
      const password = await getHash(args.password);

      // Save the new password to the User, remove old reset token fields
      await ctx
        .db("user")
        .update({
          password,
          reset_token: null,
          reset_token_expiry: null,
        })
        .where({ email: user.email });

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.AUTH_SECRET ?? "",
      );

      // Set JWT cookie
      ctx.res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, validTokenSettings),
      );

      // Return the new user
      return {
        ...convertKeysToCamelCase(user),
        resetToken: null,
        resetTokenExpiry: null,
      };
    },
    async changePassword(parent: unknown, args: any, ctx: ExtraContext) {
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Check if passwords match
      if (args.password !== args.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Hash the new password
      const password = await getHash(args.password);

      // Save the new password to the User
      await ctx.db("user").update({ password }).where({ id: ctx.user.id });

      return { message: "Your password has been changed" };
    },
    async changeEmail(parent: unknown, args: any, ctx: ExtraContext) {
      const email = args.email.toLowerCase();

      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Save the new password to the User
      await ctx.db("user").update({ email }).where({ id: ctx.user.id });

      return { message: "Your email has been changed" };
    },
  },
};

export default users;
