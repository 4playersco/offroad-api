import db from "@/db/client";

const getMyself = async (userId: string) =>
  db.select("*").from("user").where(`id = ${userId}`);

export default getMyself;
