// TODO: Automatically change Full Member status to Delinquent
//   if no meetings/runs attended in the last year
//   and send email, tag as 'past due'
//   remove from members mailing list

/*
- https://devcenter.heroku.com/articles/scheduled-jobs-custom-clock-processes
- http://www.modeo.co/blog/2015/1/8/heroku-scheduler-with-nodejs-tutorial
- https://stackoverflow.com/questions/13345664/using-heroku-scheduler-with-node-js#answer-49524719
*/
// require("dotenv").config({ path: "variables.env" });
import { startOfDay, setHours, setMinutes } from "date-fns";
import { parseFromTimeZone } from "date-fns-timezone";
import {
  guestMaxRuns,
  meetingLocation,
  meetingStartTime,
  meetingEndTime,
  timezone,
} from "@/server/constants";

import {
  AccountStatus,
  AccountType,
  EventRsvp,
  EventType,
  Office,
} from "@/types/main";
import { Month } from "@/server/types";

import db from "@/db/client";
import {
  getNotifyBoardOfInactiveMembersEmail,
  getNotifyUserOfPastDueStatusEmail,
  getNotifyUserOfRestrictedResetEmail,
  getNotifyBoardOfRestrictedResetEmail,
  getNotifyWebmasterOfMeetingEventsGeneration,
  sendTransactionalEmail,
  getSecondMondayInMonth,
} from "@/server/lib";
import { accountChanged } from "@/server/lib/membership-log";
import cuid from "@bugsnag/cuid";

const jan1 = async () => {
  console.log("It is January 1st - game time!");
  return Promise.all([
    deactivate(),
    badger(),
    cleanSlateProtocol(),
    monthlyMeetingRefill(),
  ]);
};

// Automatically change Delinquent Full Member status to Inactive
//   if no dues received in the last year
//   send email to board
//   send email to member
//   update ACCOUNT_STATUS
const deactivate = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const users = await db
        .select("id", "first_name", "last_name", "email")
        .from("user")
        .where({ account_status: AccountStatus.DELINQUENT })
        .andWhere((qb) => {
          [AccountType.FULL, AccountType.ASSOCIATE].forEach((type) => {
            qb.orWhere("account_type", "=", type);
          });
        });

      if (users && users.length > 0) {
        await users.map(async (user: any) => {
          await Promise.all([
            db("user")
              .update({ account_status: AccountStatus.INACTIVE })
              .where({ id: user.id }),
            db("membership_log_item").insert(
              accountChanged({
                stateName: "Status",
                newState: AccountStatus.INACTIVE,
                userId: user.id,
              }),
            ),
          ]);
        });

        // Email board
        await sendTransactionalEmail(
          getNotifyBoardOfInactiveMembersEmail(users),
        );

        console.log(`Deactivating completed. ${users.length} emails sent.`);
      } else {
        console.log("Deactivating completed. No results.");
      }

      return resolve(true);
    } catch (error) {
      console.log("Deactivating report error", error);
      return reject(error);
    }
  });

// Automatically change Active Full Member status to Past Due
//   if no dues received after 1/1 of each year
//   and send email, tag as 'past due'
//   update ACCOUNT_STATUS
const badger = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const users = await db
        .select("id", "first_name", "last_name", "email")
        .from("user")
        .where({ account_status: AccountStatus.ACTIVE })
        .andWhere((qb) => {
          [AccountType.FULL, AccountType.ASSOCIATE].forEach((type) => {
            qb.orWhere("account_type", "=", type);
          });
        });

      if (users && users.length > 0) {
        await users.map(async (user: any) => {
          await Promise.all([
            db("user")
              .update({ account_status: AccountStatus.PAST_DUE })
              .where({ id: user.id }),
            db("membership_log_item").insert(
              accountChanged({
                stateName: "Status",
                newState: AccountStatus.PAST_DUE,
                userId: user.id,
              }),
            ),
          ]);

          return sendTransactionalEmail(
            getNotifyUserOfPastDueStatusEmail(
              user.email,
              user.first_name,
              user.last_name,
            ),
          );
        });

        console.log(`Badgering completed. ${users.length} emails sent.`);
      } else {
        console.log("Badgering completed. No results.");
      }

      return resolve(true);
    } catch (error) {
      console.log("Badgering report error", error);
      return reject(error);
    }
  });

// Change LIMITED GUESTS to ACTIVE, notify
const cleanSlateProtocol = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const users = await db
        .select("id", "first_name", "last_name", "email")
        .from("user")
        .where({ account_status: AccountStatus.LIMITED })
        .andWhere({ account_type: AccountType.GUEST });

      if (users && users.length > 0) {
        await users.map(async (user: any) => {
          await Promise.all([
            db("user")
              .update({ account_status: AccountStatus.ACTIVE })
              .where({ id: user.id }),
            db("membership_log_item").insert(
              accountChanged({
                stateName: "Status",
                newState: AccountStatus.ACTIVE,
                userId: user.id,
              }),
            ),
          ]);

          return sendTransactionalEmail(
            getNotifyUserOfRestrictedResetEmail(
              user.email,
              user.first_name,
              user.last_name,
              guestMaxRuns,
            ),
          );
        });

        // Email board
        await sendTransactionalEmail(
          getNotifyBoardOfRestrictedResetEmail(users, guestMaxRuns),
        );

        console.log(`Clean slate completed. ${users.length} emails sent.`);
      } else {
        console.log("Clean slate completed. No results.");
      }

      return resolve(true);
    } catch (error) {
      console.log("Clean slate report error", error);
      return reject(error);
    }
  });

// Generate monthly meetings
const monthlyMeetingRefill = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const currentDate = new Date().toISOString(); // ex: 1/1/20xx UTC
      const events = (Object.keys(Month) as Array<keyof typeof Month>).map(
        async (month) => {
          const localDate = startOfDay(
            parseFromTimeZone(currentDate, {
              timeZone: timezone,
            }),
          ); // local

          const eventDate = getSecondMondayInMonth(Month[month], localDate); // local

          const startTime = setMinutes(
            setHours(
              eventDate,
              Number(meetingStartTime.split(":")[0]), // hour,
            ),
            Number(meetingStartTime.split(":")[1]), // minutes
          ); // local

          const endTime = setMinutes(
            setHours(
              eventDate,
              Number(meetingEndTime.split(":")[0]), // hour
            ),
            Number(meetingEndTime.split(":")[1]), // minutes
          ); // local

          const [president] = await db
            .select("id")
            .from("user")
            .where({ office: Office.PRESIDENT })
            .limit(1);

          const newEventId = cuid();

          return Promise.all([
            db("event").insert({
              id: newEventId,
              type: EventType.MEETING,
              title: `${Month[month]} Membership Meeting`,
              description: "",
              start_time: startTime.toISOString(),
              end_time: endTime.toISOString(),
              address: meetingLocation,
              members_only: false,
              creator: president.id,
              host: president.id,
            }),
            db("rsvp").insert({
              id: cuid(),
              status: EventRsvp.GOING,
              event: newEventId,
              member: president,
            }),
          ]);
        },
      );

      await sendTransactionalEmail(
        getNotifyWebmasterOfMeetingEventsGeneration(),
      );

      console.log(
        `Monthly meeting refill completed. ${events.length} created.`,
      );

      return resolve(true);
    } catch (error) {
      console.log("Monthly meeting refill report error", error);
      return reject(error);
    }
  });

export default jan1;
