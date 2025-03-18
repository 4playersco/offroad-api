import { monthInMs } from "../constants";
import { TrailDifficulty } from "@/types/main";
import { ExtraContext } from "@/server/types";

const Trail = {
  // Pattern borrowed from playbook:
  // https://www.prisma.io/tutorials/a-guide-to-common-resolver-patterns-ct08/#scenario:-add-a-custom/computed-field-to-a-prisma-model-via-the-application-schema-prisma-bindings
  async avgDifficulty(trail: any, args: any, ctx: ExtraContext) {
    // Get all difficulties from run reports for this trail
    const reports = await ctx.db
      .select("run_report.difficulty")
      .from("run_report")
      .innerJoin("_trail_run_report", "_trail_run_report.b", "run_report.id")
      .where("_trail_run_report.a", "=", trail.id);

    // Determine total
    const counts = reports.reduce(
      (accumulator: any, report: any) =>
        Number(TrailDifficulty[report.difficulty]) + accumulator,
      0,
    );

    if (counts) {
      const avg = Math.round(counts / reports.length);
      const entries = Object.entries(TrailDifficulty);
      const avgDifficulty = entries?.find((entry) => avg === entry[1]) ?? [];

      return avgDifficulty[0];
    }

    return "UNKNOWN";
  },
  async avgRatings(trail: any, args: any, ctx: ExtraContext) {
    // Get all ratings from run reports and checkins for this trail, determine average
    // Get all difficulties from run reports for this trail
    const reports = await ctx.db
      .select("run_report.rating")
      .from("run_report")
      .innerJoin("_trail_run_report", "_trail_run_report.b", "run_report.id")
      .where("_trail_run_report.a", "=", trail.id);

    // Determine total
    const counts = reports.reduce(
      (accumulator: any, report: any) => report.rating + accumulator,
      0,
    );

    if (counts) {
      const avgRatings = (counts / reports.length).toPrecision(3);
      return avgRatings;
    }

    return 0;
  },
  async currentConditions(trail: any, args: any, ctx: ExtraContext) {
    // Find last condition reported within the last 30 days
    const conditions = await ctx.db
      .select("condition.status")
      .from("run_report")
      .innerJoin("_run_condition", "_run_condition.a", "run_report.id") // pivot table
      .innerJoin("condition", "condition.id", "_run_condition.b")
      .where("run_report.trail", "=", trail.id)
      .andWhere("run_report.start_time", "<=", new Date(Date.now() - monthInMs))
      .limit(1);

    if (conditions.length > 0) {
      return conditions[0].status;
    }

    return "UNKNOWN";
  },
  async conditionsLastReported(trail: any, args: any, ctx: ExtraContext) {
    // Get count of all people who favorited this trail
    // Find last condition reported within the last 30 days
    const conditions = await ctx.db
      .select("condition.created_at")
      .from("run_report")
      .innerJoin("_run_condition", "_run_condition.a", "run_report.id")
      .innerJoin("condition", "condition.id", "_run_condition.b")
      .where("run_report.trail", "=", trail.id)
      .andWhere("condition.created_at", "<=", new Date(Date.now() - monthInMs))
      .limit(1);

    if (conditions.length > 0) {
      return conditions[0].created_at;
    }

    return null;
  },
  favoriteCount(trail: any, args: any, ctx: ExtraContext) {
    // Get count of all people who favorited this trail
    return ctx.db
      .count("run_report.favorite")
      .from("run_report")
      .innerJoin("_trail_run_report", "_trail_run_report.b", "run_report.id")
      .where("_trail_run_report.a", "=", trail.id)
      .andWhere("run_report.favorite", "=", true);
  },
};

export default Trail;
