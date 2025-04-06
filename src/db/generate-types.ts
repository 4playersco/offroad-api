import { Client } from "@rmp135/sql-ts";
import client from "./client";
import { writeFileSync } from "fs";

Client.fromConfig({
  tableNameCasing: "pascal",
  interfaceNameFormat: "${table}Model",
  columnNameCasing: "camel",
})
  .fetchDatabase(client)
  .toTypescript()
  .then((results) => {
    writeFileSync("src/types/database.d.ts", results);
  })
  .catch((error) => {
    console.error("Error generating types:", error);
  })
  .finally(() => {
    client.destroy();
  });
