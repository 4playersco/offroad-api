import type { Knex } from "knex";
import dotenv from "dotenv";

if (process.env.KNEX_ENV === "true") {
  dotenv.config({ path: ".env" });
}

export const defaultOptions = {
  client: "mysql2",
  connection: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  migrations: {
    directory: "./src/db/migrations",
    extension: "ts",
  },
};

const config: { [key: string]: Knex.Config } = {
  development: {
    ...defaultOptions,
    seeds: {
      directory: "./src/db/seeds",
      extension: "ts",
    },
  },
  production: {
    ...defaultOptions,
  },
};

export default config;
