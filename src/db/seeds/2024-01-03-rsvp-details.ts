import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("rsvp").del();

  // Inserts seed entries
  await knex("rsvp").insert([
    // event 1
    {
      id: "clr5s8waz0000oyb7p63k34o8",
      status: "GOING",
      guest_count: null,
      event: "clr5r344g00004gb76n0jpj36",
      vehicle: "clrpq62as00000ib7t64vqnq2",
      member: "ckomap3wt001813b791cjag69",
    },
    {
      id: "clr5s8waz0001oyb7jcrbkjaf",
      status: "GOING",
      guest_count: null,
      event: "clr5r344g00004gb76n0jpj36",
      vehicle: "clrpq62as00020ib7knudrum2",
      member: "ckomap3wt001t13b79sjcgwm8",
    },
    {
      id: "clr5s8waz0002oyb7x1y4893y",
      status: "GOING",
      guest_count: 1,
      event: "clr5r344g00004gb76n0jpj36",
      vehicle: "clrpq62at00030ib73w5gpqp3",
      member: "ckom123wt001t13b79sjcgwm8",
    },
    {
      id: "clr5s8waz0003oyb7t0tti7s1",
      status: "NOT_GOING",
      guest_count: null,
      event: "clr5r344g00004gb76n0jpj36",
      member: "ckom123wt001t13b79sjcgwm8",
    },
    // event 2
    {
      id: "clr5s8waz0004oyb72x39ycpa",
      status: "GOING",
      guest_count: null,
      event: "clr5rbytv0000gkb712fxkd9q",
      vehicle: "clrpq62at00040ib7tjz5qz11",
      member: "clr5sivhr0003yzb7u8jqo0t2", // host
    },
    {
      id: "clr5s8waz0005oyb7kzs4t46m",
      status: "GOING",
      guest_count: null,
      event: "clr5rbytv0000gkb712fxkd9q",
      vehicle: "clrpq62at00050ib7hw94x1ko",
      member: "clr5sivhr0001yzb7klcbifsk",
    },
    {
      id: "clr5s8waz0006oyb7au24vq30",
      status: "GOING",
      guest_count: null,
      event: "clr5rbytv0000gkb712fxkd9q",
      vehicle: "clrpq62as00010ib7jjboydmk",
      member: "clr5sivhr0002yzb71674lq4l",
    },
    {
      id: "clr5s8wb00007oyb76anr3b51",
      status: "GOING",
      guest_count: 1,
      event: "clr5rbytv0000gkb712fxkd9q",
      vehicle: "clrpq62at00050ib7hw94x1ko",
      member: "clr5sivhr0003yzb7u8jqo0t2",
    },
    {
      id: "clr5s8wb00008oyb7mi3qg3u6",
      status: "GOING",
      guest_count: 1,
      event: "clr5rbytv0000gkb712fxkd9q",
      vehicle: "clrpq62as00000ib7t64vqnq2",
      member: "ckomap3wt001813b791cjag69",
    },
    // event 3
    {
      id: "clr5s8wb00009oyb7lxls7m0k",
      status: "GOING",
      guest_count: null,
      event: "clr5rc0wi0000h5b7o4ebcfpm",
      vehicle: "clrpq62at00040ib7tjz5qz11",
      member: "clr5sivhr0000yzb7039zatl2", // host
    },
    {
      id: "clr5s8wb0000aoyb75h33800p",
      status: "NOT_GOING",
      guest_count: 2,
      event: "clr5rc0wi0000h5b7o4ebcfpm",
      member: "ckomap3wt001813b791cjag69",
    },
    {
      id: "clr5s8wb0000boyb72d0yescz",
      status: "GOING",
      guest_count: 1,
      event: "clr5rc0wi0000h5b7o4ebcfpm",
      vehicle: "clrpq62at00050ib7hw94x1ko",
      member: "clr5sivhr0003yzb7u8jqo0t2",
    },
    {
      id: "clr5s8wb0000coyb761nw7th6",
      status: "GOING",
      guest_count: null,
      event: "clr5rc0wi0000h5b7o4ebcfpm",
      vehicle: "clrpq62at00050ib7hw94x1ko",
      member: "ckom123wt001t13b79sjcgwm8",
    },
    // event 4
    {
      id: "clrsjxeci0000emb73tdmi8u9",
      status: "GOING",
      guest_count: null,
      event: "clr5rc4yp0000hsb7buo4t04s",
      vehicle: "clrpq62at00050ib7hw94x1ko",
      member: "clr5sivhr0001yzb7klcbifsk", // host
    },
    {
      id: "clrsjya7f0000h2b74gner7ku",
      status: "GOING",
      guest_count: null,
      event: "clr5rc4yp0000hsb7buo4t04s",
      vehicle: "clrpq62at00040ib7tjz5qz11",
      member: "clr5sivhr0002yzb71674lq4l",
    },
    {
      id: "clrsjysmj0000i5b7p49i72zr",
      status: "GOING",
      guest_count: 1,
      event: "clr5rc4yp0000hsb7buo4t04s",
      vehicle: "clrpq62as00020ib7knudrum2",
      member: "clr5sivhr0003yzb7u8jqo0t2",
    },
    // event 5
    {
      id: "clrsjxeci0001emb7jivqmi5v",
      status: "GOING",
      event: "clr5rcwd80000iub73h73oyla",
      member: "clr5sivhr0002yzb71674lq4l",
    },
    {
      id: "clrsjya7f0001h2b7e7fffz2m",
      status: "GOING",
      event: "clr5rcwd80000iub73h73oyla",
      member: "clr5sivhr0001yzb7klcbifsk",
    },
    {
      id: "clrsjysmj0001i5b7nxbo0zgo",
      status: "NOT_GOING",
      event: "clr5rcwd80000iub73h73oyla",
      member: "ckomap3wt001c13b79lu1hley",
    },
    // event 6
    {
      id: "clrsjxeci0002emb7bkthxyyi",
      status: "GOING",
      guest_count: null,
      event: "clr5rd3c20000jib7nrou9nv7",
      member: "clr5sivhr0000yzb7039zatl2", // host
    },
    {
      id: "clrsjya7f0002h2b7k6y9lutu",
      status: "GOING",
      guest_count: null,
      event: "clr5rd3c20000jib7nrou9nv7",
      member: "clr5sivhr0001yzb7klcbifsk",
    },
    {
      id: "clrsjysmj0002i5b7c0tmi8t5",
      status: "GOING",
      guest_count: null,
      event: "clr5rd3c20000jib7nrou9nv7",
      member: "clr5sivhr0003yzb7u8jqo0t2",
    },
  ]);
}
