import { ExtraContext } from "../types/main";

const Ballot = {
  // Pattern borrowed from playbook:
  // https://www.prisma.io/tutorials/a-guide-to-common-resolver-patterns-ct08/#scenario:-add-a-custom/computed-field-to-a-prisma-model-via-the-application-schema-prisma-bindings
  async results(parent: any, args: any, ctx: ExtraContext) {
    const { id } = parent;
    const votes = await ctx.db.select("*").from("vote").where({ ballot: id });

    const results = votes.reduce((accumulator: any, vote: any) => {
      let entryExists = false;

      // Does this entry exist in accumulator yet?
      const existingResults = accumulator.map((entry: any) => {
        if (
          (vote.candidate === null && entry.candidate === null) ||
          (vote.candidate !== null &&
            entry.candidate !== null &&
            entry.candidate.id === vote.candidate.id)
        ) {
          entry.count++;
          entryExists = true;
        }
        return entry;
      });

      return entryExists
        ? [...existingResults]
        : [
            ...accumulator,
            {
              count: 1,
              candidate: vote.candidate,
            },
          ];
    }, []);

    return results.sort((a: any, b: any) => {
      if (a.count < b.count) {
        return 1;
      }
      if (a.count > b.count) {
        return -1;
      }
      return 0;
    });
    return results;
  },
};

export default Ballot;
