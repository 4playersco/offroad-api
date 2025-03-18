import knex from "knex";
import config from "./config";

const env =
  process.env.NODE_ENV === "production"
    ? config.production
    : config.development;

const client = knex(env);

export default client;
