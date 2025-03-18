import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cloudinary_image").del();

  // Inserts seed entries
  await knex("cloudinary_image").insert([
    // Vehicles
    {
      id: "clrsjju840000xtb7t97r17we",
      public_id: "rowValue1",
      url: faker.image.url({ width: 2640, height: 1760 }),
      small_url: faker.image.url({ width: 610, height: 440 }),
    },
    {
      id: "clrsjju840001xtb7vdn5u6pl",
      public_id: "rowValue2",
      url: faker.image.url({ width: 2640, height: 1760 }),
      small_url: faker.image.url({ width: 610, height: 440 }),
    },
    {
      id: "clrsjju840002xtb7zg7p3x5r",
      public_id: "rowValue3",
      url: faker.image.url({ width: 2640, height: 1760 }),
      small_url: faker.image.url({ width: 610, height: 440 }),
    },
    {
      id: "clrsjju840003xtb7gy25i9b7",
      public_id: "rowValue4",
      url: faker.image.url({ width: 2640, height: 1760 }),
      small_url: faker.image.url({ width: 610, height: 440 }),
    },
    {
      id: "clrsjju840004xtb700c85oaw",
      public_id: "rowValue5",
      url: faker.image.url({ width: 2640, height: 1760 }),
      small_url: faker.image.url({ width: 610, height: 440 }),
    },
    {
      id: "clrsjju840005xtb7aozozfy3",
      public_id: "rowValue6",
      url: faker.image.url({ width: 2640, height: 1760 }),
      small_url: faker.image.url({ width: 610, height: 440 }),
    },
    // Events
    {
      id: "clrpqt7uq0006pob7x8ar2ggl",
      public_id: "rowValue7",
      url: faker.image.url({ width: 1400, height: 800 }),
      small_url: faker.image.url({ width: 700, height: 400 }),
    },
    {
      id: "clrpqt7uq0007pob730ssmzur",
      public_id: "rowValue8",
      url: faker.image.url({ width: 1400, height: 800 }),
      small_url: faker.image.url({ width: 700, height: 400 }),
    },
    // Trails
    {
      id: "clrpqt7uq0008pob73rmegvz2",
      public_id: "rowValue9",
      url: faker.image.url({ width: 1440, height: 810 }),
      small_url: faker.image.url({ width: 720, height: 405 }),
    },
    {
      id: "clrpqt7uq0009pob7lu95gg85",
      public_id: "rowValue10",
      url: faker.image.url({ width: 1440, height: 810 }),
      small_url: faker.image.url({ width: 720, height: 405 }),
    },
    {
      id: "clrpqt7ur000apob7g6xw297d",
      public_id: "rowValue11",
      url: faker.image.url({ width: 1440, height: 810 }),
      small_url: faker.image.url({ width: 720, height: 405 }),
    },
    {
      id: "clrpqt7ur000bpob797i4wtxv",
      public_id: "rowValue12",
      url: faker.image.url({ width: 1440, height: 810 }),
      small_url: faker.image.url({ width: 720, height: 405 }),
    },
    {
      id: "clrprov4f0000kkb7pqirfe9e",
      public_id: "rowValue13",
      url: faker.image.url({ width: 1440, height: 810 }),
      small_url: faker.image.url({ width: 720, height: 405 }),
    },
  ]);

  // Deletes ALL existing entries
  await knex("rig_image").del();

  // Inserts seed entries
  await knex("rig_image").insert([
    { id: "clrpr4hyi0000z5b72u5lua8c", image: "clrsjju840000xtb7t97r17we" },
    { id: "clrpr4hyi0001z5b73grpdm6e", image: "clrsjju840001xtb7vdn5u6pl" },
    { id: "clrpr4hyi0002z5b7s9n9skcg", image: "clrsjju840002xtb7zg7p3x5r" },
    { id: "clrpr4hyi0003z5b7wef1g465", image: "clrsjju840003xtb7gy25i9b7" },
    { id: "clrpr4hyi0004z5b7w7x8wq0b", image: "clrsjju840004xtb700c85oaw" },
    { id: "clrpr4hyj0005z5b7w7jl5nix", image: "clrsjju840005xtb7aozozfy3" },
  ]);
}
