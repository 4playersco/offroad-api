/*
- https://devcenter.heroku.com/articles/scheduled-jobs-custom-clock-processes
- http://www.modeo.co/blog/2015/1/8/heroku-scheduler-with-nodejs-tutorial
- https://stackoverflow.com/questions/13345664/using-heroku-scheduler-with-node-js#answer-49524719
*/
// require("dotenv").config({ path: "variables.env" });
import db from "@/db/client";
import {
  getRemindUserOfPastDueStatusEmail,
  sendTransactionalEmail,
} from "@/lib";
import { AccountStatus, AccountType } from "@/types/server";

const mar1 = async () => {
  console.log("It is March 1st - game time!");
  return Promise.all([remindOfDues()]);
};

// Send reminders for dues if not paid yet
const remindOfDues = async () =>
  new Promise(async (resolve) => {
    try {
      const users = await db
        .select("id", "first_name", "last_name", "email")
        .from("user")
        .where({ account_status: AccountStatus.PAST_DUE })
        .andWhere((qb) => {
          [AccountType.FULL, AccountType.ASSOCIATE].forEach((type) => {
            qb.orWhere("account_type", "=", type);
          });
        });

      if (users && users.length > 0) {
        await Promise.all(
          users.map(async (user: any) => {
            return sendTransactionalEmail(
              getRemindUserOfPastDueStatusEmail(
                user.email,
                user.first_name,
                user.last_name,
              ),
            );
          }),
        );

        console.log(`Reminding completed. ${users.length} emails sent.`);
      } else {
        console.log("Reminding completed. No results.");
      }

      return resolve(true);
    } catch (e) {
      console.log("Reminder report error", e);
      return resolve(true);
    }
  });

export default mar1;
