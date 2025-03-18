import { EventRsvp, EventType } from "@/types/main";
import { ExtraContext } from "@/server/types";

const User = {
  runsAttendedCount(user: any, args: any, ctx: ExtraContext) {
    // Count number of runs attended
    return ctx.db
      .count("rsvp.id")
      .from("event")
      .innerJoin("rsvp", "rsvp.event", "event.id")
      .where("rsvp.status", "=", EventRsvp.GOING)
      .andWhere("event.type", "=", EventType.RUN)
      .andWhere("rsvp.member", "=", user.id)
      .andWhere("event.end_time", "<=", new Date().toISOString());
  },
};

export default User;
