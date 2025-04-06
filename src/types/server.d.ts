import { BaseContext } from "@apollo/server";

declare global {
  namespace Express {
    export interface Request {
      language?: Language;
      user?: User;
      userId?: string;
    }
  }
}

interface ResponseBody<T> {
  data: T;
}

interface ResponseError {
  error: string[];
}

interface User {
  id: string;
  role: string;
  accountType: string;
  accountStatus: string;
  events?: EventDetails[];
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

type ContextUser = Pick<
  User,
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "username"
  | "accountStatus"
  | "accountType"
  | "role"
>;

export interface ExtraContext extends BaseContext {
  db: Knex;
  loaders: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  user: ContextUser;
}

interface EmailUser extends User {
  events: EventDetails[];
  details: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

type EmailInfo = {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  reason?: string;
  resetToken?: string;
  inviter?: string;
};

type EventDetails = {
  id: string;
  title: string;
  type: EventType;
  startTime: string;
  endTime: string;
  rallyAddress: string;
};
