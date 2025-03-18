import {
  hasRole,
  hasAccountType,
  hasAccountStatus,
  convertKeysToCamelCase,
  convertKeysToSnakeCase,
} from "@/server/lib";
import { AccountStatus, AccountType, Role } from "@/types/main";
import { ExtraContext } from "@/server/types";
import cuid from "@bugsnag/cuid";

const elections = {
  queries: {
    async electionCandidates(parent: any, args: any, ctx: ExtraContext) {
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

      // If they do, query all the users
      return ctx.db
        .select("*")
        .from("user")
        .where({ accountStatus: args.accountStatus })
        .andWhere((qb) => {
          args.roles.map((role: string) => {
            qb.orWhere("role", "=", role);
          });
        });
    },
    getActiveElections(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account type?
      hasAccountType(ctx.user, [AccountType.FULL]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const now = new Date().toISOString();

      return ctx.db
        .select("*")
        .from("election")
        .where("start_time", "<=", now)
        .andWhere("end_time", ">", now)
        .orderBy("end_time ASC");
    },
    getActiveElectionsWithResults(parent: any, args: any, ctx: ExtraContext) {
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

      const now = new Date().toISOString();

      // @TODO Filter elections with results
      return ctx.db
        .select("*")
        .from("election")
        .where("start_time", "<=", now)
        .andWhere("end_time", ">", now)
        .orderBy("end_time ASC");
    },
    getElection(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account type?
      hasAccountType(ctx.user, [AccountType.FULL]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      return ctx.db.select("*").from("election").where({ id: args.id });
    },
    getUserVote(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account type?
      hasAccountType(ctx.user, [AccountType.FULL]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      return ctx.db
        .select("*")
        .from("vote")
        .where({ ballot: args.ballot })
        .andWhere({ voter: ctx.user.id })
        .limit(1);
    },
  },
  mutations: {
    async submitElection(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      hasRole(ctx.user, [Role.ADMIN, Role.OFFICER]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const { election } = args;

      // Format races
      const races = election.races.map((race: any) => {
        race.candidates = {
          connect: race.candidates,
        };
        return race;
      });

      // Update election
      const electionId = cuid();

      const results = await Promise.all([
        ctx.db("election").insert({
          id: electionId,
          election_name: election.electionName,
          start_time: election.startTime,
          end_time: election.endTime, // 1 week default
        }),
        ctx.db("race").insert({ id: cuid(), ...convertKeysToSnakeCase(races) }),
      ]);

      return convertKeysToCamelCase(results);
    },
    async submitVote(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Requesting user has proper account type?
      hasAccountType(ctx.user, [AccountType.FULL]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      // Have they voted for this ballot before?
      const { vote } = args;
      const votes = await ctx.db
        .select("*")
        .from("vote")
        .where({ ballot: vote.ballot, voter: ctx.user.id });

      if (votes.length > 0) {
        throw new Error("User has voted already");
      }

      const data = {
        dateTime: new Date(vote.dateTime + "12:00:00").toISOString(),
        ballot: {
          connect: {
            id: vote.ballot,
          },
        },
        voter: {
          connect: {
            id: ctx?.user?.id,
          },
        },
      };

      if (vote.candidate) {
        // @ts-ignore
        data.candidate = {
          connect: { id: vote.candidate },
        };
      }

      // Record vote
      await ctx.db("vote").insert(convertKeysToSnakeCase(data));

      return { message: "Thank you for voting" };
    },
  },
};

export default elections;
