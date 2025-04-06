import db from "@/db/client";

const getMyself = async (userId: string) =>
  db.selectFrom("user").selectAll().where("id", "=", `${userId}`);

export default getMyself;
