import { ExtraContext } from "../types/server";

const Election = {
  races(election: any, args: any, ctx: ExtraContext) {
    return ctx.db
      .select("ballot.*")
      .from("election")
      .innerJoin("_ballot_to_election", "_ballot_to_election.b", election.id)
      .innerJoin("ballot", "ballot.id", "_ballot_to_election.a");
  },
};

export default Election;
