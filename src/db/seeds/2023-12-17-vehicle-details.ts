import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("vehicle_mods").del();
  await knex("vehicle").del();

  // Inserts seed entries
  await knex("vehicle").insert([
    {
      id: "clrpq62as00000ib7t64vqnq2",
      year: "2010",
      make: "Toyota",
      model: "4Runner",
      trim: "Trail",
      name: faker.hacker.noun(),
      image: "clrsjju840000xtb7t97r17we",
    },
    {
      id: "clrpq62as00010ib7jjboydmk",
      year: "2004",
      make: "Jeep",
      model: "Wrangler",
      trim: "Unlimited Rubicon",
      name: faker.hacker.noun(),
      image: "clrsjju840001xtb7vdn5u6pl",
    },
    {
      id: "clrpq62as00020ib7knudrum2",
      year: "2001",
      make: "Toyota",
      model: "Tacoma",
      trim: "SR5",
      name: faker.hacker.noun(),
      image: "clrsjju840002xtb7zg7p3x5r",
    },
    {
      id: "clrpq62at00030ib73w5gpqp3",
      year: "2020",
      make: "Jeep",
      model: "Wrangler",
      trim: "Sahara",
      name: faker.hacker.noun(),
      image: "clrsjju840003xtb7gy25i9b7",
    },
    {
      id: "clrpq62at00040ib7tjz5qz11",
      year: "2011",
      make: "Toyota",
      model: "4Runner",
      trim: "Trail Edition",
      name: faker.hacker.noun(),
      image: "clrsjju840004xtb700c85oaw",
    },
    {
      id: "clrpq62at00050ib7hw94x1ko",
      year: "2023",
      make: "Chevrolet",
      model: "Colorado",
      trim: "ZR2",
      name: faker.hacker.noun(),
      image: "clrsjju840005xtb7aozozfy3",
    },
  ]);

  // Inserts seed entries
  await knex("vehicle_mods").insert([
    {
      node_id: "clrpq62as00000ib7t64vqnq2",
      position: 1000,
      value: '33" BFGoodrich KO2 tires',
    },
    {
      node_id: "clrpq62as00000ib7t64vqnq2",
      position: 2000,
      value: '2" receiver hitch',
    },
    {
      node_id: "clrpq62as00000ib7t64vqnq2",
      position: 3000,
      value: "ARB front bumper",
    },
  ]);
}
