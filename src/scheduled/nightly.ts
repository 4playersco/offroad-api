/*
- https://devcenter.heroku.com/articles/scheduled-jobs-custom-clock-processes
- http://www.modeo.co/blog/2015/1/8/heroku-scheduler-with-nodejs-tutorial
- https://stackoverflow.com/questions/13345664/using-heroku-scheduler-with-node-js#answer-49524719
*/
// require("dotenv").config({ path: "variables.env" });
import { formatToTimeZone } from "date-fns-timezone";
import { startOfDay, endOfDay, addDays, subDays, startOfYear } from "date-fns";

import db from "@/db/client";
import {
  sendTransactionalEmail,
  getRunReminderEmail,
  getReportReminderEmail,
  getNotifyUserOfRestrictedStatusEmail,
  getNotifyBoardOfRestrictedGuestsEmail,
} from "@/lib";
import { guestMaxRuns, datePrintFormat, timezone } from "@/constants";
import { AccountStatus, EventRsvp, EventType } from "@/types/server";
import { EventDetails } from "@/types/server";

const urlBase = "https://members.4-playersofcolorado.org";

const nightly = async () =>
  Promise.all([
    eventReminders(),
    runReportReminders(),
    guestLockouts(),
    // lockedAccountReminders
  ]);

// Send event reminders to attendees if their event is tomorrow
const eventReminders = async () =>
  new Promise(async (resolve, reject) => {
    console.log("Starting event reminders");

    try {
      const events = await db
        .select(
          "event.id",
          "event.type",
          "event.title",
          "event.start_time",
          "event.rally_address",
        )
        .from("event")
        .innerJoin("rsvp", "rsvp.event", "event.id")
        .where({ "event.type": EventType.RUN })
        .andWhere(
          "event.start_time",
          ">=",
          startOfDay(addDays(new Date(), 1)).toISOString(),
        )
        .andWhere(
          "event.start_time",
          "<",
          startOfDay(addDays(new Date(), 1)).toISOString(),
        )
        .andWhere({ "rsvp.status": EventRsvp.GOING });

      const eventIds = events.map((event) => event.id);

      const rsvps = await db
        .select("rsvp.event", "user.email", "user.first_name", "user.last_name")
        .from("rsvp")
        .innerJoin("user", "user.id", "rsvp.member")
        .whereIn("rsvp.event", eventIds);

      let emailCount = 0;

      for (let event of events) {
        const {
          id,
          title,
          type,
          start_time: startTime,
          rally_address: rallyAddress,
        } = event;

        console.log("Composing emails for ", title);

        await rsvps
          .filter((rsvp) => rsvp.event === id)
          .forEach(async (rsvp) => {
            const { email, first_name: firstName, last_name: lastName } = rsvp;

            emailCount++;

            const formattedStartTime = formatToTimeZone(
              startTime,
              datePrintFormat,
              {
                timeZone: timezone,
              },
            );

            await sendTransactionalEmail(
              getRunReminderEmail(
                email,
                firstName,
                lastName,
                {
                  id,
                  title,
                  type,
                  startTime: formattedStartTime,
                  rallyAddress,
                } as EventDetails,
                urlBase,
              ),
            );
          });
      }

      if (events && events.length) {
        console.log(`Event reminders completed. ${emailCount} emails sent.`);
      } else {
        console.log("Event reminders completed. No results.");
      }

      return resolve(true);
    } catch (e) {
      console.log("Event reminders error", e);
      return resolve(true);
    }
  });

// Remind run leader to submit run report
const runReportReminders = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const events = await db
        .select(
          "event.id",
          "event.type",
          "event.title",
          "event.start_time",
          "event.rally_address",
          "user.id AS host_id",
          "user.email AS host_email",
          "user.first_name AS host_first_name",
          "user.last_name AS host_last_name",
        )
        .from("event")
        .innerJoin("rsvp", "rsvp.event", "event.id")
        .innerJoin("user", "user.id", "event.host")
        .where((qb) => {
          qb.where({ "event.type": EventType.RUN });
          qb.orWhere({ "event.type": EventType.CAMPING });
        })
        .andWhere(
          "event.start_time",
          ">=",
          startOfDay(subDays(new Date(), 1)).toISOString(),
        )
        .andWhere(
          "event.start_time",
          "<",
          endOfDay(subDays(new Date(), 1)).toISOString(),
        )
        .andWhere({ "rsvp.status": EventRsvp.GOING });

      await events.map(async (event: any) => {
        const {
          id,
          title,
          endTime,
          host_first_name,
          host_email,
          host_last_name,
        } = event;

        const formattedEndTime = formatToTimeZone(endTime, datePrintFormat, {
          timeZone: timezone,
        });

        return sendTransactionalEmail(
          getReportReminderEmail(
            host_email,
            host_first_name,
            host_last_name,
            {
              id,
              title,
              endTime: formattedEndTime,
            } as EventDetails,
            urlBase,
          ),
        );
      });

      // @TODO: Remind attendees to... submit photos? Fill out survey?

      return resolve(true);
    } catch (e) {
      console.log("Event report error", e);
      return resolve(true);
    }
  });

// Post run: Guest lockout
const guestLockouts = async () =>
  new Promise(async (resolve) => {
    try {
      // Get all rsvps
      // where user.account_type = guest
      // where user is active or past due
      // where status: going
      // where
      // for all events starting... and ending...

      const rsvps = await db
        .select(
          "rsvp.id",
          "rsvp.is_rider",
          "rsvp.event",
          "event.title",
          "event.start_time",
          "user.first_name",
          "user.last_name",
          "user.email",
        )
        .where({ "rsvp.status": EventRsvp.GOING })
        .andWhere((qb) => {
          qb.where("rsvp.is_rider", "=", false);
          qb.orWhere("rsvp.is_rider", "IS", null);
        })
        .andWhere(
          "event.start_time",
          ">=",
          startOfYear(new Date()).toISOString(),
        )
        .andWhere(
          "event.end_time",
          "<",
          endOfDay(subDays(new Date(), 1)).toISOString(),
        )
        .andWhere({ accountType: "GUEST" })
        .andWhere((qb) => {
          [AccountStatus.ACTIVE, AccountStatus.PAST_DUE].forEach((type) => {
            qb.orWhere("account_status", "=", type);
          });
        });

      const usersToLockOut = rsvps.reduce((memo: any, rsvp: any) => {
        if (rsvp.is_rider === true) {
          return memo;
        }

        return memo[rsvp.member.id]
          ? {
              ...memo,
              [rsvp.member.id]: {
                id: rsvp.member.id,
                details: {
                  firstName: rsvp.member.firstName,
                  lastName: rsvp.member.lastName,
                  email: rsvp.member.email,
                },
                events: {
                  ...memo[rsvp.member.id].events,
                  [rsvp.event.id]: rsvp.event,
                },
              },
            }
          : {
              ...memo,
              [rsvp.member.id]: {
                id: rsvp.member.id,
                details: {
                  firstName: rsvp.member.firstName,
                  lastName: rsvp.member.lastName,
                  email: rsvp.member.email,
                },
                events: {
                  [rsvp.event.id]: rsvp.event,
                },
              },
            };
      }, {});

      const filteredUsers: any = Object.values(usersToLockOut).reduce(
        (memo: any, user: any) => {
          if (Object.values(user.events).length < guestMaxRuns) {
            return memo;
          }

          return [...memo, user];
        },
        [],
      );

      if (filteredUsers && filteredUsers.length > 0) {
        await Promise.all(
          filteredUsers.map(async (user: any) => {
            const events: any = Object.values(user.events).map((event) => {
              console.log("event", event);
              return event;
            });

            // Update records
            await db("user")
              .update({ accountStatus: AccountStatus.LIMITED })
              .where({ id: user.id });

            // Email users
            return sendTransactionalEmail(
              getNotifyUserOfRestrictedStatusEmail(
                user.details.email,
                user.details.firstName,
                user.details.lastName,
                events,
                guestMaxRuns,
              ),
            );
          }),
        );

        // Email board
        await sendTransactionalEmail(
          getNotifyBoardOfRestrictedGuestsEmail(filteredUsers, guestMaxRuns),
        );
      }

      if (filteredUsers && filteredUsers.length > 0) {
        console.log(
          `Guest lockouts completed. ${filteredUsers.length} emails sent.`,
        );
      } else {
        console.log("Guest lockouts completed. No results.");
      }

      return resolve(true);
    } catch (e) {
      console.log("Event report error", e);
      return resolve(true);
    }
  });
// @TODO - Rejected accounts to be deleted after 30 days

// @TODO - Locked accounts reminder to secretary/webmaster
//    has it been 3 days since the user created their account?
//    send email to board
const lockedAccountReminders = new Promise((resolve, reject) => resolve(true));

export default nightly;
