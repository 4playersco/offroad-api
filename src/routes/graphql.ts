import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

import * as resolvers from "@/server/resolvers";
import * as loaders from "@/server/loaders";
import { DateTime } from "@/server/resolvers/partials/custom";
import { ExtraContext } from "@/server/types";

import db from "@/db/client";
import { getLoggedInUser } from "@/server/data";
import { NextApiRequest } from "next";

// Note: this uses a path relative to the project's root directory
const typeDefs = readFileSync("src/server/schema.graphql", {
  encoding: "utf-8",
});

const server = new ApolloServer<ExtraContext>({
  typeDefs,
  resolvers: {
    DateTime,
    ...resolvers,
  },
});

export default startServerAndCreateNextHandler<NextApiRequest, ExtraContext>(
  server,
  {
    context: async (req, res): Promise<ExtraContext> => ({
      req,
      res,
      db,
      loaders,
      user: await getLoggedInUser(req),
    }),
  }
);
