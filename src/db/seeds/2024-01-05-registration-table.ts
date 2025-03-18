import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("registration").del();

  // Inserts seed entries
  await knex("registration").insert([
    {
      id: "clrr4ctru0000tbb7ld0x3obc",
      last_name: "Letmein",
      first_name: "Please",
      email: "please@letmein.com",
      source: "Website",
      token: "fc4aa1d12f14a5f60ff33d672ebd7357c4c9eb98",
      token_expiry: "2021-05-15 22:56:29.331",
    },
  ]);
}
