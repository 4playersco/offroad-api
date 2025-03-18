import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("trail").del();

  // Inserts seed entries
  await knex("trail").insert([
    {
      id: "clr5rgc8l0000n6b70fumlb0o",
      name: "Yankee Hill",
      slug: "yankee-hill",
      featured_image: "clrpqt7uq0009pob7lu95gg85",
    },
    {
      id: "clr5rioe10000peb7ukeeutuc",
      name: "Red Cone",
      slug: "red-cone",
      featured_image: "clrpqt7ur000apob7g6xw297d",
    },
    {
      id: "clr5rixyx0000q5b73gwhl23j",
      name: "Black Bear Pass",
      slug: "black-bear-pass",
      featured_image: "clrpqt7ur000bpob797i4wtxv",
    },
    {
      id: "clr5rjdaq0000r7b7rdhyu5x9",
      name: "Holy Cross",
      slug: "holy-cross",
      featured_image: "clrpqt7uq0008pob73rmegvz2",
    },
    {
      id: "clr5rjmac0000rxb7sc3951aw",
      name: "Wheeler Lake",
      slug: "wheeler-lake",
      featured_image: "clrprov4f0000kkb7pqirfe9e",
    },
  ]);
}
