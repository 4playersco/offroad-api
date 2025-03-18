import { BaseContext } from "@apollo/server";
import type { Knex } from "knex";
import type { NextFunction, Request, Response } from "express";

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

interface ExtraContext extends BaseContext {
  db: Knex;
  loaders: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface EmailUser extends User {
  events: EventDetails[];
  details: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export enum Month {
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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
