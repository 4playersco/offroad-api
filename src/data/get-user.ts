import { Request, Response, NextFunction } from "express";
import db from "@/db/client";
import { userFromDb } from "@/adapters";

// See info about the user if logged in
async function getUserInfo(req: Request, res: Response, next: NextFunction) {
  if (!req.userId) {
    // console.log("no req.userId");
    return next();
  }

  const user = await db
    .select<RawUser>(
      "id",
      "firstName",
      "lastName",
      "accountType",
      "accountStatus",
      "role",
      "email",
      "username",
    )
    .from("user")
    .where(`id = ${req.userId}`)
    .limit(1);

  req.user = userFromDb(user);

  next();
}

export default getUserInfo;
