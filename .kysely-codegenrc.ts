import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE } =
  process.env;

const config = {
  camelCase: true,
  dialect: "mysql",
  outFile: "./src/types/db.d.ts",
  runtimeEnums: "pascal-case",
  typeOnlyImports: true,
  url: `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}`,
};

export default config;
