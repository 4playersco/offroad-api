import { Knex } from "knex";
import { createTimestamp } from "../utils";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("membership_log_item").del();

  // Inserts seed entries
  await knex("membership_log_item").insert([
    {
      id: "clrr5x9k20000g2b7glw901ua",
      time: createTimestamp(),
      message: "Account created",
      message_code: "ACCOUNT_CREATED",
      user: "clr5sivhr0000yzb7039zatl2",
      logger: "ckom123wt001t13b79sjcgwm8",
    },
    {
      id: "clr5sivhr0001yzb7klcbifsk",
      time: createTimestamp(),
      message: "Account unlocked by admin",
      message_code: "ACCOUNT_UNLOCKED",
      user: "ckomap3wt001813b791cjag69",
      logger: "ckom123wt001t13b79sjcgwm8",
    },
    {
      id: "clr5sivhr0002yzb71674lq4l",
      time: createTimestamp(),
      message: "Paid $40",
      message_code: "DUES_PAID",
      user: "ckomap3wt001813b791cjag69",
      logger: "ckom123wt001t13b79sjcgwm8",
    },
  ]);
}
