import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import { createTimestamp } from "../utils";

/**
 * Seed activity_log_item table
 * @param knex
 */
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("activity_log_item").del();

  // Inserts seed entries
  await knex("activity_log_item").insert([
    {
      id: "clrr5j9r700000lb7malnmc8a",
      time: createTimestamp(),
      message: "Became a full member",
      message_code: "JOINED",
      user: "clr5sivhr0000yzb7039zatl2",
      link: faker.internet.url(),
    },
  ]);
}
