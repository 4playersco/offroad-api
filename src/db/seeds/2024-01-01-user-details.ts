import { Knex } from "knex";
import { faker } from "@faker-js/faker";

/**
 * Seed _user_contact_info table
 * @param knex
 *
 * a: user
 * b: contact info
 */
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("contact_info").del();
  await knex("_user_contact_info").del();
  await knex("user_meta").del();
  await knex("_user_meta").del();
  await knex("preference").del();
  await knex("_user_preferences").del();
  await knex("user_equipment").del();
  await knex("user_titles").del();

  // Inserts seed entries
  await knex("contact_info").insert([
    {
      id: "clrr55rki0000m8b7o7fus400",
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number(),
    },
    {
      id: "clrr55rki0001m8b7arqtwhip",
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number(),
    },
    {
      id: "clrr55rki0002m8b7krxngodg",
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number(),
    },
    {
      id: "clrr55rki0003m8b7rldycs03",
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number(),
    },
    {
      id: "clrr55rkj0004m8b78e4unkyr",
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number(),
    },
    {
      id: "clrr55rkj0005m8b7n0kidom9",
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number(),
    },
    {
      id: "clrr55rkj0006m8b7xib5uh4y",
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number(),
    },
    {
      id: "clrr55rkj0007m8b7c4spx6af",
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number(),
    },
  ]);

  // Inserts seed entries
  await knex("_user_contact_info").insert([
    { a: "clrr55rki0000m8b7o7fus400", b: "ckomap3wt001813b791cjag69" },
    { a: "clrr55rki0001m8b7arqtwhip", b: "ckomap3wt001c13b79lu1hley" },
    { a: "clrr55rki0002m8b7krxngodg", b: "ckomap3wt001t13b79sjcgwm8" },
    { a: "clrr55rki0003m8b7rldycs03", b: "ckom123wt001t13b79sjcgwm8" },
    { a: "clrr55rkj0004m8b78e4unkyr", b: "clr5sivhr0000yzb7039zatl2" },
    { a: "clrr55rkj0005m8b7n0kidom9", b: "clr5sivhr0001yzb7klcbifsk" },
    { a: "clrr55rkj0006m8b7xib5uh4y", b: "clr5sivhr0002yzb71674lq4l" },
    { a: "clrr55rkj0007m8b7c4spx6af", b: "clr5sivhr0003yzb7u8jqo0t2" },
  ]);

  // Inserts seed entries
  await knex("user_meta").insert([
    {
      id: "clrr2zqpw00009ub7wweyu0mt",
      email_verified: 1,
      first_login_complete: 1,
      account_setup_complete: 1,
      old_site_migration_complete: 0,
      email_public_notifications: 1,
      email_member_notifications: 1,
    },
    {
      id: "clrr2zqpw00019ub7g69z7req",
      email_verified: 1,
      first_login_complete: 1,
      account_setup_complete: 1,
      old_site_migration_complete: 0,
      email_public_notifications: 1,
      email_member_notifications: 1,
    },
    {
      id: "clrr2zqpw00029ub72pkes7ws",
      email_verified: 1,
      first_login_complete: 1,
      account_setup_complete: 1,
      old_site_migration_complete: 0,
      email_public_notifications: 1,
      email_member_notifications: 1,
    },
    {
      id: "clrr3bi1y0000pob7asor03mq",
      email_verified: 1,
      first_login_complete: 1,
      account_setup_complete: 1,
      old_site_migration_complete: 0,
      email_public_notifications: 1,
      email_member_notifications: 1,
    },
    {
      id: "clrr3bi1y0001pob79xjyltex",
      email_verified: 1,
      first_login_complete: 1,
      account_setup_complete: 1,
      old_site_migration_complete: 0,
      email_public_notifications: 1,
      email_member_notifications: 1,
    },
    {
      id: "clrr3bi1y0002pob7stzomh64",
      email_verified: 1,
      first_login_complete: 1,
      account_setup_complete: 1,
      old_site_migration_complete: 0,
      email_public_notifications: 1,
      email_member_notifications: 1,
    },
    {
      id: "clrr3bi1y0003pob70mmal0f9",
      email_verified: 1,
      first_login_complete: 1,
      account_setup_complete: 1,
      old_site_migration_complete: 0,
      email_public_notifications: 1,
      email_member_notifications: 1,
    },
    {
      id: "clrr3bi1y0004pob7jeknfh3t",
      email_verified: 1,
      first_login_complete: 1,
      account_setup_complete: 1,
      old_site_migration_complete: 0,
      email_public_notifications: 1,
      email_member_notifications: 1,
    },
  ]);

  // Inserts seed entries
  await knex("_user_meta").insert([
    { a: "ckomap3wt001813b791cjag69", b: "clrr2zqpw00009ub7wweyu0mt" },
    { a: "ckomap3wt001c13b79lu1hley", b: "clrr2zqpw00019ub7g69z7req" },
    { a: "ckomap3wt001t13b79sjcgwm8", b: "clrr2zqpw00029ub72pkes7ws" },
    { a: "ckom123wt001t13b79sjcgwm8", b: "clrr3bi1y0000pob7asor03mq" },
    { a: "clr5sivhr0000yzb7039zatl2", b: "clrr3bi1y0001pob79xjyltex" },
    { a: "clr5sivhr0001yzb7klcbifsk", b: "clrr3bi1y0002pob7stzomh64" },
    { a: "clr5sivhr0002yzb71674lq4l", b: "clrr3bi1y0003pob70mmal0f9" },
    { a: "clr5sivhr0003yzb7u8jqo0t2", b: "clrr3bi1y0004pob7jeknfh3t" },
  ]);

  // Inserts seed entries
  await knex("preference").insert([
    {
      id: "clrr4iuhq0000z7b7ufodtkib",
      emergency_contact_name: faker.person.fullName(),
      emergency_contact_phone: faker.phone.number(),
      photo_permissions: 1,
      show_phone_number: 1,
      tshirt_size: "XL",
    },
    {
      id: "clrr4iuhq0001z7b7s1k3msw2",
      emergency_contact_name: faker.person.fullName(),
      emergency_contact_phone: faker.phone.number(),
      photo_permissions: 1,
      show_phone_number: 1,
      tshirt_size: "XL",
    },
    {
      id: "clrr4iuhq0002z7b7j9vetykr",
      emergency_contact_name: faker.person.fullName(),
      emergency_contact_phone: faker.phone.number(),
      photo_permissions: 1,
      show_phone_number: 1,
      tshirt_size: "XL",
    },
    {
      id: "clrr4iuhq0003z7b7cerqtrhh",
      emergency_contact_name: faker.person.fullName(),
      emergency_contact_phone: faker.phone.number(),
      photo_permissions: 1,
      show_phone_number: 1,
      tshirt_size: "XL",
    },
    {
      id: "clrr4iuhq0004z7b7y5zuzy6z",
      emergency_contact_name: faker.person.fullName(),
      emergency_contact_phone: faker.phone.number(),
      photo_permissions: 1,
      show_phone_number: 1,
      tshirt_size: "XL",
    },
    {
      id: "clrr4iuhq0005z7b7mvsju7xj",
      emergency_contact_name: faker.person.fullName(),
      emergency_contact_phone: faker.phone.number(),
      photo_permissions: 1,
      show_phone_number: 1,
      tshirt_size: "XL",
    },
    {
      id: "clrr4iuhq0006z7b7whd2cclg",
      emergency_contact_name: faker.person.fullName(),
      emergency_contact_phone: faker.phone.number(),
      photo_permissions: 1,
      show_phone_number: 1,
      tshirt_size: "XL",
    },
    {
      id: "clrr4iuhq0007z7b7ftawslgu",
      emergency_contact_name: faker.person.fullName(),
      emergency_contact_phone: faker.phone.number(),
      photo_permissions: 1,
      show_phone_number: 1,
      tshirt_size: "XL",
    },
  ]);

  // Inserts seed entries
  await knex("_user_preferences").insert([
    { a: "clrr4iuhq0000z7b7ufodtkib", b: "ckomap3wt001813b791cjag69" },
    { a: "clrr4iuhq0001z7b7s1k3msw2", b: "ckomap3wt001c13b79lu1hley" },
    { a: "clrr4iuhq0002z7b7j9vetykr", b: "ckomap3wt001t13b79sjcgwm8" },
    { a: "clrr4iuhq0003z7b7cerqtrhh", b: "ckom123wt001t13b79sjcgwm8" },
    { a: "clrr4iuhq0004z7b7y5zuzy6z", b: "clr5sivhr0000yzb7039zatl2" },
    { a: "clrr4iuhq0005z7b7mvsju7xj", b: "clr5sivhr0001yzb7klcbifsk" },
    { a: "clrr4iuhq0006z7b7whd2cclg", b: "clr5sivhr0002yzb71674lq4l" },
    { a: "clrr4iuhq0007z7b7ftawslgu", b: "clr5sivhr0003yzb7u8jqo0t2" },
  ]);

  // Inserts seed entries
  await knex("user_equipment").insert([
    {
      node_id: "clr5sivhr0001yzb7klcbifsk",
      position: 1000,
      value: "Hi-Lift jack",
    },
    {
      node_id: "clr5sivhr0001yzb7klcbifsk",
      position: 2000,
      value: "Snatch block",
    },
    {
      node_id: "clr5sivhr0001yzb7klcbifsk",
      position: 3000,
      value: "First aid kit",
    },
  ]);

  // Inserts seed entries
  await knex("user_titles").insert([
    {
      node_id: "clr5sivhr0002yzb71674lq4l",
      position: 1000,
      value: "WEBMASTER",
    },
  ]);
}
