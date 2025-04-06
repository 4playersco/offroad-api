import { RawUser } from "../types/data";
import { User } from "../types/server";
import { eventsFromDb } from "./index";

const userFromDb = (dbUser: RawUser): User => ({
  id: dbUser.id,
  role: dbUser.role,
  accountType: dbUser.account_type,
  accountStatus: dbUser.account_status,
  events: eventsFromDb(dbUser?.events),
  firstName: dbUser.first_name,
  lastName: dbUser.last_name,
  email: dbUser.email,
  username: dbUser.username,
});

export default userFromDb;
