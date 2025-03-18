import { Knex } from "knex";
import { faker } from "@faker-js/faker";

/**
 * Seed _event_trail table
 * @param knex
 *
 * a: event
 * b: trail
 */
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("event").del();

  // Inserts seed entries
  await knex("event").insert([
    {
      id: "clr5r344g00004gb76n0jpj36",
      type: "RUN",
      title: `${faker.lorem.sentence({ min: 2, max: 4 })} run`,
      description: faker.lorem.sentences({ min: 3, max: 5 }),
      start_time: faker.date.past({ years: 1 }),
      end_time: faker.date.past({ years: 1 }),
      rally_address: faker.location.streetAddress(),
      trail_difficulty: "EASY",
      members_only: 0,
      max_rigs: 8,
      host: "clr5sivhr0001yzb7klcbifsk",
      creator: "ckom123wt001t13b79sjcgwm8",
    },
    {
      id: "clr5rbytv0000gkb712fxkd9q",
      type: "RUN",
      title: `${faker.lorem.sentence({ min: 2, max: 4 })} run`,
      description: faker.lorem.sentences({ min: 3, max: 5 }),
      start_time: faker.date.future({ years: 1 }),
      end_time: faker.date.future({ years: 1 }),
      rally_address: faker.location.streetAddress(),
      trail_difficulty: "INTERMEDIATE",
      members_only: 1,
      max_rigs: 8,
      host: "clr5sivhr0001yzb7klcbifsk",
      creator: "ckom123wt001t13b79sjcgwm8",
    },
    {
      id: "clr5rc0wi0000h5b7o4ebcfpm",
      type: "RUN",
      title: `${faker.lorem.sentence({ min: 2, max: 4 })} run`,
      description: faker.lorem.sentences({ min: 3, max: 5 }),
      start_time: faker.date.future({ years: 1 }),
      end_time: faker.date.future({ years: 1 }),
      rally_address: faker.location.streetAddress(),
      trail_difficulty: "INTERMEDIATE",
      members_only: 0,
      max_rigs: 8,
      host: "clr5sivhr0001yzb7klcbifsk",
      creator: "ckom123wt001t13b79sjcgwm8",
    },
    {
      id: "clr5rc4yp0000hsb7buo4t04s",
      type: "RUN",
      title: `${faker.lorem.sentence({ min: 2, max: 4 })} run`,
      description: faker.lorem.sentences({ min: 3, max: 5 }),
      start_time: faker.date.future({ years: 1 }),
      end_time: faker.date.future({ years: 1 }),
      rally_address: faker.location.streetAddress(),
      trail_difficulty: "ADVANCED",
      members_only: 0,
      max_rigs: 10,
      host: "clr5sivhr0001yzb7klcbifsk",
      creator: "ckom123wt001t13b79sjcgwm8",
    },
    {
      id: "clr5rcwd80000iub73h73oyla",
      type: "MEETING",
      title: `${faker.lorem.sentence({ min: 2, max: 4 })} meeting`,
      description: faker.lorem.sentences({ min: 3, max: 5 }),
      start_time: faker.date.future({ years: 1 }),
      end_time: faker.date.future({ years: 1 }),
      address: faker.location.streetAddress(),
      members_only: 0,
      max_rigs: 8,
      host: "clr5sivhr0000yzb7039zatl2",
      creator: "ckom123wt001t13b79sjcgwm8",
      featured_image: "clrpqt7uq0006pob7x8ar2ggl",
    },
    {
      id: "clr5rd3c20000jib7nrou9nv7",
      type: "FUNDRAISER",
      title: `${faker.lorem.sentence({ min: 2, max: 4 })} fundraiser`,
      description: faker.lorem.sentences({ min: 3, max: 5 }),
      start_time: faker.date.future({ years: 1 }),
      end_time: faker.date.future({ years: 1 }),
      address: faker.location.streetAddress(),
      members_only: 0,
      host: "clr5sivhr0000yzb7039zatl2",
      creator: "ckom123wt001t13b79sjcgwm8",
      featured_image: "clrpqt7uq0007pob730ssmzur",
    },
  ]);

  // Deletes ALL existing entries
  await knex("_event_trail").del();

  // Inserts seed entries
  await knex("_event_trail").insert([
    { a: "clr5r344g00004gb76n0jpj36", b: "clr5rgc8l0000n6b70fumlb0o" },
    { a: "clr5rbytv0000gkb712fxkd9q", b: "clr5rioe10000peb7ukeeutuc" },
    { a: "clr5rc0wi0000h5b7o4ebcfpm", b: "clr5rixyx0000q5b73gwhl23j" },
    { a: "clr5rc4yp0000hsb7buo4t04s", b: "clr5rjdaq0000r7b7rdhyu5x9" },
  ]);
}
