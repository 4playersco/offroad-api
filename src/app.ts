import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
// import {
//   startServerAndCreateLambdaHandler,
//   handlers,
// } from "@as-integrations/aws-lambda";

import { readFileSync } from "fs";

import * as dotevnv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { getIcal, getUpcoming } from "@/routes/calendar";
import { getDocs } from "@/routes/backblaze";

import * as resolvers from "@/resolvers";
import * as loaders from "@/loaders";
import { DateTime } from "@/resolvers/partials/custom";
import db from "@/db/client";
import { getUserInfo, getUserIdFromToken, requireHTTPS } from "@/data";
import { ExtraContext } from "./types/main";

dotevnv.config();

const PORT = parseInt(process.env.PORT as string, 10);

if (!PORT) {
  console.log(`No port value specified...`);
}

const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_URL,
};

const app = express();
const httpServer = http.createServer(app);

if (process.env.NODE_ENV !== "production") {
  app.get("/backblaze", getDocs);
}

app.use(requireHTTPS);
app.get("/calendar/upcoming/:count", getUpcoming);
app.get("/calendar/ical", getIcal);
app.use(cors<cors.CorsRequest>(corsOptions));
app.use(cookieParser());
app.use(helmet()); // ?

app.use(getUserIdFromToken);
app.use(getUserInfo);

// GraphQL setup
const typeDefs = readFileSync("src/schema.graphql", {
  encoding: "utf-8",
});

const server = new ApolloServer<ExtraContext>({
  typeDefs,
  resolvers: {
    DateTime,
    ...resolvers,
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  express.json(),
  expressMiddleware(server, {
    context: async () => ({
      db,
      loaders,
    }),
  }),
);

if (process.env.NODE_ENV === "development") {
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
} else {
  // LAMBDA
  // export default startServerAndCreateLambdaHandler(
  //   server,
  //   handlers.createAPIGatewayProxyEventV2RequestHandler(),
  // );
}
