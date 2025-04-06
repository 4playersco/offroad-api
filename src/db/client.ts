// import knex from "knex";
// import config from "./config";

// const env =
//   process.env.NODE_ENV === "production"
//     ? config.production
//     : config.development;

// const client = knex(env);

// export default client;

import { type DB } from "@/types/db";
import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE } =
  process.env;

const dialect = new MysqlDialect({
  pool: createPool({
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    port: Number(MYSQL_PORT),
    connectionLimit: 10,
  }),
});

const db = new Kysely<DB>({
  dialect,
});

export default db;
