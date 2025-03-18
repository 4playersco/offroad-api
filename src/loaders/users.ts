import DataLoader from "dataloader";
import db from "@/db/client";

async function batchGetUsers(keys: readonly string[]) {
  const results = await db.select("*").from("user").whereIn("id", keys);
  return keys.map((key: string, index: number) =>
    results[index].id === key
      ? results[index]
      : new Error(`No result for ${key}`)
  );
}

const userLoader = new DataLoader(batchGetUsers);

export default userLoader;
