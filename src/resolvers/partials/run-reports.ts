import { EventRsvp } from "@/types/enums";

const runReports = {
  queries: {
    async runReportInfo(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Is active run leader
      // @TODO

      return ctx.db
        .select("event.*")
        .from("event")
        .innerJoin("rsvp", "rsvp.event", "event.id")
        .where("event.id", args.eventId)
        .andWhere("rsvp.status", EventRsvp.GOING)
        .limit(1);
    },
    async runReportUsers(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Is active run leader
      // @TODO

      return ctx.db
        .select("*")
        .from("user")
        .where((qb) => {
          args.accountTypes.map((accountType: string) => {
            qb.orWhere("account_type", "!=", accountType);
          });
        })
        .andWhere((qb) => {
          args.accountStatus.map((accountStatus: string) => {
            qb.orWhere("account_status", "!=", accountStatus);
          });
        })
        .andWhere((qb) => {
          args.roles.map((role: string) => {
            qb.orWhere("role", "!=", role);
          });
        });
    },
  },
  mutations: {},
};

export default runReports;
