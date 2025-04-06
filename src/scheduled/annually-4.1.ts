/*
- https://devcenter.heroku.com/articles/scheduled-jobs-custom-clock-processes
- http://www.modeo.co/blog/2015/1/8/heroku-scheduler-with-nodejs-tutorial
- https://stackoverflow.com/questions/13345664/using-heroku-scheduler-with-node-js#answer-49524719
*/
// require("dotenv").config({ path: "variables.env" });
import db from "@/db/client";
import {
  sendTransactionalEmail,
  getNotifyUserOfDelinquentStatusEmail,
  getNotifyBoardOfDelinquentsEmail,
} from "@/lib";
import { accountChanged } from "@/lib/membership-log";
import { AccountStatus, AccountType } from "@/types/server";

const apr1 = async () => {
  console.log("It is April 1st - game time!");
  return Promise.all([delinquentize()]);
};

// Automatically change Past Due Full Member status to Delinquent
//   if no dues received after 3/31 of each year
//   send email
//   remove from members list
//   remove 'past due' tag
const delinquentize = async () =>
  new Promise(async (resolve, reject) => {
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
        await users.map(async (user: any) => {
          await Promise.all([
            db("user")
              .update({ account_status: AccountStatus.DELINQUENT })
              .where({ id: user.id }),
            db("membership_log_item").insert(
              accountChanged({
                stateName: "Status",
                newState: AccountStatus.DELINQUENT,
                userId: user.id,
              }),
            ),
          ]);

          // @TODO: Remove from SendGrid members newsletter list
          // @TODO: Update tag in SendGrid members newsletter list

          return sendTransactionalEmail(
            getNotifyUserOfDelinquentStatusEmail(
              user.email,
              user.first_name,
              user.last_name,
            ),
          );
        });

        // Email board
        await sendTransactionalEmail(getNotifyBoardOfDelinquentsEmail(users));

        console.log(`Delinquentizing completed. ${users.length} emails sent.`);
      } else {
        console.log("Delinquentizing completed. No results.");
      }

      return resolve(true);
    } catch (e) {
      console.log("Delinquent report error", e);
      return resolve(true);
    }
  });

export default apr1;
