import {
  hasRole,
  hasAccountStatus,
  determineTitleChanges,
  determineOfficeChanges,
} from "@/lib";
import { accountChanged, accountUnlocked } from "@/lib/membership-log";
import { AccountStatus, Role } from "@/types/enums";
import type { ExtraContext } from "@/types/server";

import cuid from "@bugsnag/cuid";

const admin = {
  queries: {
    // async adminStats(parent: unknown, args: any, ctx: ExtraContext) {
    //   // Logged in?
    //   if (!ctx?.user?.id) {
    //     throw new Error("You must be logged in");
    //   }
    //   // Requesting user has proper role?
    //   hasRole(ctx.user, ["ADMIN", "OFFICER", "RUN_MASTER"]);
    //   // Requesting user has proper account type?
    //   hasAccountType(ctx.user, ["FULL"]);
    //   // Requesting user has proper account status?
    //   hasAccountStatus(ctx.user, ["ACTIVE", "PAST_DUE"]);
    //   return ctx.db.query.votes(
    //     {
    //       where: {
    //         AND: [
    //           { ballot: { id: args.ballot } },
    //           { voter: { id: ctx.userId } }
    //         ]
    //       },
    //       first: true
    //     },
    //     info
    //   );
    //   const [
    //     activeFullMembers,
    //     pastDueFullMembers,
    //     delinquentFullMembers,
    //     removedFullMembers,
    //     resignedFullMembers,
    //     inactiveFullMembers,
    //     limitedGuestMembers,
    //     lockedGuestMembers,
    //     emeritusMembers,
    //     deceasedMembers,
    //     associateMembers,
    //     guestMembers,
    //     charterMembers,
    //     fullMembersLastYear,
    //     newFullMembersThisYear,
    //     neededForQuorum,
    //     neededToPassMotion,
    //     neededToVoteOnNewMember,
    //     newFullMembersAllowed,
    //     fullMembersAllowed
    //   ] = Promise.all([
    //     ctx.db.query.usersConnection(
    //       {
    //         where: {}
    //       },
    //       info
    //     )
    //   ]);
    //   const results = {};
    //   return {
    //     activeFullMembers,
    //     pastDueFullMembers,
    //     delinquentFullMembers,
    //     removedFullMembers,
    //     resignedFullMembers,
    //     inactiveFullMembers,
    //     limitedGuestMembers,
    //     lockedGuestMembers,
    //     emeritusMembers,
    //     deceasedMembers,
    //     associateMembers,
    //     guestMembers,
    //     charterMembers,
    //     fullMembersLastYear,
    //     newFullMembersThisYear,
    //     neededForQuorum,
    //     neededToPassMotion,
    //     neededToVoteOnNewMember,
    //     newFullMembersAllowed,
    //     fullMembersAllowed
    //   };
    // },
    // async activeMembersPerYear(parent: unknown, args: any, ctx: ExtraContext) {
    //   // Logged in?
    //   if (!ctx?.user?.id) {
    //     throw new Error("You must be logged in");
    //   }
    //   hasRole(ctx.user, ["ADMIN", "OFFICER", "RUN_MASTER"]);
    //   // Requesting user has proper account type?
    //   hasAccountType(ctx.user, ["FULL"]);
    //   // Requesting user has proper account status?
    //   hasAccountStatus(ctx.user, ["ACTIVE", "PAST_DUE"]);
    //   return ctx.db.query.users(
    //     {
    //       where: {}
    //     },
    //     info
    //   );
    //   return [
    //     {
    //       year,
    //       count
    //     }
    //   ];
    // },
    // async guestsWithLockedAccounts(parent: unknown, args: any, ctx: ExtraContext) {
    //   // Logged in?
    //   if (!ctx?.user?.id) {
    //     throw new Error("You must be logged in");
    //   }
    //   hasRole(ctx.user, ["ADMIN", "OFFICER", "RUN_MASTER"]);
    //   // Requesting user has proper account type?
    //   hasAccountType(ctx.user, ["FULL"]);
    //   // Requesting user has proper account status?
    //   hasAccountStatus(ctx.user, ["ACTIVE", "PAST_DUE"]);
    //   return ctx.db.query.users(
    //     {
    //       where: {
    //         AND: [{ accountType: "GUEST" }, { accountStatus: "LOCKED" }]
    //       }
    //     },
    //     info
    //   );
    // },
    // async guestsAskedToJoin(parent: unknown, args: any, ctx: ExtraContext) {
    //   // Logged in?
    //   if (!ctx?.user?.id) {
    //     throw new Error("You must be logged in");
    //   }
    //   hasRole(ctx.user, ["ADMIN", "OFFICER", "RUN_MASTER"]);
    //   // Requesting user has proper account type?
    //   hasAccountType(ctx.user, ["FULL"]);
    //   // Requesting user has proper account status?
    //   hasAccountStatus(ctx.user, ["ACTIVE", "PAST_DUE"]);
    //   return ctx.db.query.users(
    //     {
    //       where: {
    //         AND: [{ accountType: "GUEST" }, { accountStatus: "LIMITED" }]
    //       }
    //     },
    //     info
    //   );
    // },
    // async guestsEligibleForMembership(parent: unknown, args: any, ctx: ExtraContext) {
    //   // Logged in?
    //   if (!ctx?.user?.id) {
    //     throw new Error("You must be logged in");
    //   }
    //   hasRole(ctx.user, ["ADMIN", "OFFICER", "RUN_MASTER"]);
    //   // Requesting user has proper account type?
    //   hasAccountType(ctx.user, ["FULL"]);
    //   // Requesting user has proper account status?
    //   hasAccountStatus(ctx.user, ["ACTIVE", "PAST_DUE"]);
    //   // TODO: Has attended 1 run
    //   // TODO: Has attended 1 meeting
    //   const results = ctx.db.query.users({
    //     where: {
    //       AND: [
    //         { accountType: "GUEST" },
    //         { accountStatus: "ACTIVE" },
    //         {
    //           eventsRSVPd_some: {
    //             where: {
    //               type: {}
    //             }
    //           }
    //         }
    //       ]
    //     }
    //   });
    //   // Filter over 18
    //   // Filter at least 1 run
    //   // Filter at least 1 meeting
    // }
  },
  mutations: {
    async updateRole(
      parent: unknown,
      args: { userId: string; role: Role },
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      hasRole(ctx.user, [Role.ADMIN]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      // Update role
      try {
        return Promise.all([
          ctx.db("user").update({ role: args.role }).where({ id: args.userId }),
          ctx.db("membership_log_item").insert(
            accountChanged({
              stateName: "Role",
              newState: args.role,
              userId: ctx?.user?.id,
            }),
          ),
        ]);
      } catch (error) {
        console.error(error);
        throw new Error("Unable to update role");
      }
    },
    async updateAccountType(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      hasRole(ctx.user, [Role.ADMIN]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      // Changing account type to 'FULL', add membership log
      return Promise.all([
        ctx
          .db("user")
          .update({ account_type: args.accountType })
          .where({ id: args.userId }),
        ctx.db("membership_log_item").insert(
          accountChanged({
            stateName: "Account type",
            newState: args.accountType,
            userId: ctx?.user?.id,
          }),
        ),
      ]);
    },
    async updateAccountStatus(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      hasRole(ctx.user, [Role.ADMIN]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      // Query the current user
      const [currentUser] = await ctx.db
        .select("account_status")
        .from("user")
        .where({ id: args.userId })
        .limit(1);

      // Account unlocked
      if (
        currentUser.accountStatus === AccountStatus.LOCKED &&
        args.accountStatus !== AccountStatus.LOCKED
      ) {
        ctx
          .db("membership_log_item")
          .insert(accountUnlocked(ctx?.user?.id, args.userId));
      }

      return Promise.all([
        // Update status
        ctx.db("user").update({ accountStatus: args.accountStatus }).where({
          id: args.userId,
        }),
        // Add membership log
        ctx.db("membership_log_item").insert(
          accountChanged({
            stateName: "Account status",
            newState: args.accountStatus,
            userId: args.userId,
            loggerId: ctx.user.id,
          }),
        ),
      ]);
    },
    async updateOffice(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper account status to do this?
      hasRole(ctx.user, [Role.ADMIN]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const [existingOffice] = await ctx.db
        .select("office")
        .from("user")
        .where({ id: args.userId })
        .limit(1);

      if (args.office !== null) {
        const [existingOfficer] = await ctx.db
          .select("first_name", "last_name")
          .from("user")
          .where({ office: args.office })
          .limit(1);

        if (existingOfficer) {
          throw new Error(
            `Officer already assigned to ${existingOfficer.firstName} ${existingOfficer.lastName}. Unassign first, then try again.`,
          );
        }
      }

      const [_, officeToAdd, officeLogs] = determineOfficeChanges(
        existingOffice === "NONE" ? null : existingOffice,
        args.office,
        ctx?.user?.id,
        args.userId,
        true,
      );

      return Promise.all([
        // Update office
        ctx
          .db("user")
          .update({ office: officeToAdd === "" ? null : officeToAdd })
          .where({
            id: args.userId,
          }),
        // Add membership log(s)
        officeLogs.forEach(async (log: any) =>
          ctx.db("membership_log_item").insert(accountChanged(log)),
        ),
      ]);
    },
    async updateTitles(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      hasRole(ctx.user, [Role.ADMIN]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const [existingTitles] = await ctx.db
        .select("value")
        .from("user_titles")
        .where({ node_id: args.userId });

      const [titlesToRemove, titlesToAdd, titleLogs] = determineTitleChanges(
        existingTitles,
        args.titles,
        ctx?.user?.id,
        args.userId.true,
      );

      return Promise.all([
        titlesToRemove.forEach(async (title: string) =>
          ctx
            .db("user_titles")
            .where({ value: title, node_id: args.userId })
            .delete(),
        ),
        titlesToAdd.forEach(async (title: string) =>
          ctx
            .db("user_titles")
            .insert({ node_id: cuid(), position: 1000, value: title }),
        ),
        titleLogs.forEach(async (log: any) =>
          ctx.db("membership_log_item").insert(accountChanged(log)),
        ),
      ]);
    },
  },
};

export default admin;
