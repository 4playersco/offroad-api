import cuid from "@bugsnag/cuid";

import { hasRole, hasAccountStatus, convertKeysToSnakeCase } from "@/lib";
import { defaultPaginationSize } from "@/constants";
import {
  AccountStatus,
  AccountType,
  Role,
  RsvpStatus,
  EventType,
  type QueryGetUpcomingEventsArgs,
  type QueryGetUserEventsArgs,
  type QueryGetPastEventsArgs,
  type QueryGetEventArgs,
  type MutationCreateEventArgs,
  type MutationDeleteEventArgs,
  type MutationUpdateEventArgs,
  type MutationSetRsvpArgs,
} from "@/generated/graphql";

import type { ExtraContext } from "@/types/server";

const events = {
  queries: {
    async getUpcomingEvents(
      _parent: unknown,
      args: QueryGetUpcomingEventsArgs,
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [AccountStatus.Active, AccountStatus.PastDue]);

      const { count, page } = args;

      // @TODO wrap in try/catch

      // No page? Show all
      if (!page && !count) {
        return ctx.db
          .selectFrom("event")
          .selectAll()
          .where("startTime", ">=", new Date())
          .orderBy("startTime", "asc")
          .execute();
      }

      const skip = (page ? page - 1 : 1) * defaultPaginationSize;

      return ctx.db
        .selectFrom("event")
        .selectAll()
        .where("startTime", ">=", new Date())
        .orderBy("startTime", "asc")
        .limit(count || defaultPaginationSize)
        .offset(skip <= 0 ? 0 : skip)
        .execute();
    },
    async upcomingEventsCount(
      _parent: unknown,
      _args: unknown,
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [AccountStatus.Active, AccountStatus.PastDue]);

      return ctx.db
        .selectFrom("event")
        .select((eb) => eb.fn.count<number>("id").as("count"))
        .where("startTime", ">=", new Date())
        .executeTakeFirstOrThrow();
    },
    async getUserEvents(
      _parent: unknown,
      args: QueryGetUserEventsArgs,
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper role?
      hasRole(ctx.user, [Role.Admin, Role.Officer, Role.RunMaster]);

      // Requesting user has proper account type?
      hasAccountStatus(ctx.user, [AccountStatus.Active, AccountStatus.PastDue]);

      const id =
        args.username === "self"
          ? ctx?.user?.id
          : await ctx.db
              .selectFrom("user")
              .select("id")
              .where("username", "=", args.username)
              .executeTakeFirstOrThrow();

      return ctx.db
        .selectFrom("event")
        .selectAll("event")
        .innerJoin("rsvp", "rsvp.event", "event.id")
        .where((eb) =>
          eb.and([
            eb("startTime", ">=", new Date()),
            eb("rsvp.status", "=", "GOING"),
            ...(args.eventType ? [eb("event.type", "=", args.eventType)] : []),
            eb("rsvp.member", "=", typeof id === "string" ? id : id.id),
          ]),
        )
        .orderBy("startTime", "desc")
        .execute();
    },
    async getPastEvents(
      _parent: unknown,
      args: QueryGetPastEventsArgs,
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [AccountStatus.Active, AccountStatus.PastDue]);

      const { count, page } = args;

      // No page? Show all
      if (!page && !count) {
        return ctx.db
          .selectFrom("event")
          .selectAll()
          .where("startTime", "<", new Date())
          .orderBy("startTime", "desc")
          .execute();
      }

      const skip = (page ? page - 1 : 1) * defaultPaginationSize;

      return ctx.db
        .selectFrom("event")
        .selectAll()
        .where("startTime", "<", new Date())
        .orderBy("startTime", "desc")
        .limit(count || defaultPaginationSize)
        .offset(skip <= 0 ? 0 : skip)
        .execute();
    },
    async pastEventsCount(_parent: unknown, _args: unknown, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [AccountStatus.Active, AccountStatus.PastDue]);

      return ctx.db
        .selectFrom("event")
        .select((eb) => eb.fn.count<number>("id").as("count"))
        .where("startTime", "<", new Date())
        .executeTakeFirstOrThrow();
    },
    async getEvent(
      _parent: unknown,
      args: QueryGetEventArgs,
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [AccountStatus.Active, AccountStatus.PastDue]);

      const result = await ctx.db
        .selectFrom("event")
        .selectAll()
        .where("id", "=", args.eventId)
        .execute();

      if (!result || !result[0]) {
        throw new Error("Event cannot be found");
      }

      if (result[0].membersOnly && ctx.user.accountType === AccountType.Guest) {
        throw new Error("You cheeky bastard! Nice try.");
        // Email webmaster
      }

      return result;
    },
    async getNextEvent(_parent: unknown, _args: unknown, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [AccountStatus.Active, AccountStatus.PastDue]);

      const results = await ctx.db
        .select("*")
        .from("event")
        .where("start_time", ">=", new Date().toISOString())
        .orderBy("start_time ASC")
        .limit(1);

      return results.length > 0 ? results[0] : null;
    },
    // async getMyNextEvent(parent: unknown, args: any, ctx: ExtraContext) {
    //   // Logged in?
    //   if (!ctx?.user?.id) {
    //     throw new Error("You must be logged in");
    //   }

    //   // Requesting user has proper account status?
    //   hasAccountStatus(ctx.user, ["ACTIVE", "PAST_DUE"]);

    //   try {
    //     // const results = await ctx.db.query.user(
    //     //   {
    //     //     where: {
    //     //       startTime_gte: new Date().toISOString(),
    //     //       rsvps_every: {
    //     //         member: {
    //     //           id: ctx.userId
    //     //         }
    //     //       }
    //     //     },
    //     //     orderBy: "startTime_ASC",
    //     //     first: 1,
    //     //   },
    //     //   info
    //     // );

    //     const results = await ctx.db.query

    //     console.log(results);

    //     return results.length > 0 ? results[0]: {};
    //   } catch (e) {
    //     throw new Error(e);
    //   }
    // },
  },
  mutations: {
    async createEvent(
      _parent: unknown,
      args: MutationCreateEventArgs,
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      hasRole(ctx.user, [Role.Admin, Role.Officer, Role.RunMaster]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [AccountStatus.Active, AccountStatus.PastDue]);

      const { event } = args;

      const [host] = await ctx.db
        .selectFrom("user")
        .select(["id", "vehicle"])
        .where("email", "=", event.host)
        .execute();

      // Create event, RSVP
      const eventId = cuid();
      const rsvpId = cuid();

      await Promise.all([
        ctx.db
          .insertInto("event")
          .values({
            id: eventId,
            type: event.type,
            title: event.title,
            description: event.description || "",
            startTime:
              typeof event.startTime === "string" ||
              typeof event.startTime === "number"
                ? new Date(event.startTime)
                : null,
            endTime: new Date(event.endTime),
            address: event.address || "",
            trailDifficulty: event.trailDifficulty || "",
            // trailNotes: event.trailNotes,
            featuredImage: event.featuredImage || null,
            rallyAddress: event.rallyAddress || "",
            membersOnly: event.membersOnly ? 1 : 0,
            maxAttendees: event.maxAttendees || -1,
            maxRigs: event.maxRigs || -1,
            changeDisabled: event.changeDisabled ? 1 : 0,
            creator: ctx.user.id,
            host: host.id,
          })
          .execute(),
        event.trail
          ? ctx.db
              .insertInto("_EventTrail")
              .values({
                a: eventId,
                b: event.trail,
              })
              .execute()
          : Promise.resolve(),
        ctx.db
          .insertInto("rsvp")
          .values({
            id: rsvpId,
            member: host.id,
            event: eventId,
            vehicle: host.vehicle,
            status: RsvpStatus.Going,
          })
          .execute(),

        ctx.db
          .insertInto("_MembersRsvp")
          .values({
            a: host.id,
            b: rsvpId,
          })
          .execute(),
      ]);

      return { message: "Your event has been created" };
    },
    async deleteEvent(
      _parent: unknown,
      args: MutationDeleteEventArgs,
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      hasRole(ctx.user, [Role.Admin, Role.Officer, Role.RunMaster]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [AccountStatus.Active, AccountStatus.PastDue]);

      const { id: eventId } = args;

      const existingEvent = await ctx.db
        .selectFrom("event")
        .select(["title", "featuredImage"])
        .where("id", "=", eventId)
        .executeTakeFirstOrThrow();

      const existingRsvps = await ctx.db
        .selectFrom("rsvp")
        .select("id")
        .where("event", "=", eventId)
        .execute();

      try {
        // Delete featured image
        if (existingEvent.featuredImage) {
          await ctx.db
            .deleteFrom("cloudinaryImage")
            .where("id", "=", existingEvent.featuredImage)
            .execute();
        }

        // Delete _event_trail pivot entry
        await ctx.db
          .deleteFrom("_EventTrail")
          .where("a", "=", eventId)
          .execute();

        // Delete rsvps
        if (existingRsvps && existingRsvps.length > 0) {
          const ids = existingRsvps.map(({ id }: { id: string }) => id);
          await ctx.db.deleteFrom("rsvp").where("id", "in", ids).execute();
        }

        // Delete event
        await ctx.db.deleteFrom("event").where("id", "=", eventId).execute();

        return { message: `${existingEvent.title} event has been deleted` };
      } catch (e) {
        console.error(e);
        throw new Error("Could not delete event");
      }
    },
    async updateEvent(
      _parent: unknown,
      args: MutationUpdateEventArgs,
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      hasRole(ctx.user, [Role.Admin, Role.Officer, Role.RunLeader]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [AccountStatus.Active, AccountStatus.PastDue]);

      const { event, id: eventId } = args;

      // Get current event for later comparison
      const existingEvent = await ctx.db
        .selectFrom("event")
        .select(["id", "host", "featuredImage"])
        .where("id", "=", eventId)
        .executeTakeFirstOrThrow();

      const existingRsvps = await ctx.db
        .selectFrom("rsvp")
        .select(["id", "member"])
        .where("rsvp.event", "=", eventId)
        .execute();

      const existingTrail = await ctx.db
        .selectFrom("_EventTrail")
        .select("b as id")
        .where("a", "=", eventId)
        .executeTakeFirst();

      const newHost = await ctx.db
        .selectFrom("user")
        .select("id")
        .where("username", "=", event.host)
        .executeTakeFirstOrThrow();

      const data = {
        title: event.title,
        type: event.type,
        description: event.description || "",
        start_time:
          typeof event.startTime === "string" ||
          typeof event.startTime === "number"
            ? new Date(event.startTime).toISOString()
            : null,
        end_time: new Date(event.endTime).toISOString(),
        address: event.address || "",
        trail_difficulty: event.trailDifficulty || "",
        // trailNotes: event.trailNotes,
        rally_address: event.rallyAddress || "",
        members_only: event.membersOnly,
        max_attendees: event.maxAttendees,
        max_rigs: event.maxRigs,
        change_disabled: event.changeDisabled,
        host: newHost.id,
        featured_image: event.featuredImage || existingEvent.featuredImage,
      };

      // Does host need an RSVP?
      if (
        existingRsvps &&
        !existingRsvps.find((rsvp) => rsvp.member === newHost.id)
      ) {
        const rsvpId = cuid();

        await Promise.all([
          ctx.db
            .insertInto("rsvp")
            .values({
              id: rsvpId,
              member: newHost.id,
              event: eventId,
              status: RsvpStatus.Going,
            })
            .execute(),
          ctx.db
            .insertInto("_MembersRsvp")
            .values({
              a: newHost.id,
              b: rsvpId,
            })
            .execute(),
        ]);
      }

      // Is a new trail assigned?
      if (event.trail && event.trail !== "0") {
        await ctx.db
          .insertInto("_EventTrail")
          .values({ a: eventId, b: event.trail })
          .execute();
      } else if (
        existingEvent.trail &&
        existingTrail &&
        existingTrail.id &&
        !event.trail
      ) {
        // Remove old trail
        await ctx.db
          .deleteFrom("_EventTrail")
          .where("a", "=", eventId)
          .execute();
      }

      // Is a new featured image assigned?
      if (event.newFeaturedImage) {
        const newImageId = cuid();
        // New featured image submitted
        await ctx.db
          .insertInto("cloudinaryImage")
          .values({
            id: newImageId,
            ...convertKeysToSnakeCase(event.newFeaturedImage),
          })
          .execute();

        data.featured_image = newImageId;
      } else {
        // Do nothing. We can't be sure the old featured image isn't in use anywhere else
        data.featured_image = null;
      }

      await ctx.db.updateTable("event").set(data).where("id", "=", eventId);

      return { message: "Your event has been updated" };
    },
    async setRSVP(
      _parent: unknown,
      args: MutationSetRsvpArgs,
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      const { rsvp } = args;

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [AccountStatus.Active, AccountStatus.PastDue]);

      if (!rsvp || !rsvp.userId) {
        throw new Error("RSVP must be provided");
      }

      // Requesting user has proper role?
      if (ctx?.user?.id !== rsvp.userId) {
        hasRole(ctx.user, [Role.Admin, Role.Officer]);
      }

      // Query the current user
      // @TODO Start back up from here
      const currentUser = await ctx.db
        .selectFrom("user")
        .select(["id", "accountStatus", "accountType"])
        .where("id", "=", rsvp.userId)
        .executeTakeFirst();

      // Query the current upcoming RSVPs
      const currentUserRsvps = await ctx.db
        .selectFrom("rsvp")
        .select([
          "rsvp.id",
          "rsvp.status",
          "rsvp.event",
          "rsvp.vehicle",
          "rsvp.guestCount",
          "event.changeDisabled",
        ])
        .innerJoin("event", "event.id", "rsvp.event")
        .where("rsvp.member", "=", rsvp.userId)
        .where((qb) => qb.and(["rsvp.startTime", ">=", new Date()]))
        .execute();

      if (!currentUser) {
        throw new Error("User does not have permission");
      }

      if (
        currentUser.accountStatus !== AccountStatus.Active &&
        currentUser.accountStatus !== AccountStatus.PastDue
      ) {
        throw new Error("Guest does not have permission");
      }

      if (currentUser.accountType === "GUEST") {
        const currentGuestRsvps = await ctx.db
          .selectFrom("rsvp")
          .select(["rsvp.id", "rsvp.status"])
          .innerJoin("event", "event.id", "rsvp.event")
          .where("rsvp.member", "=", rsvp.userId)
          .andWhere({ "rsvp.status": RsvpStatus.Going })
          .andWhere({ "event.type": EventType.Run })
          .andWhere("rsvp.start_time", ">=", new Date().toISOString())
          .limit(4)
          .execute();

        if (
          currentGuestRsvps[0].length >= 3 &&
          rsvp.status === RsvpStatus.Going
        ) {
          throw new Error(
            "Guests can only attend 3 runs. Please become a member to attend more.",
          );
        }
      }

      // Has this user already RSVPd?
      const userRSVP = currentUserRsvps.find(
        (RsvpStatus: any) => RsvpStatus.id === rsvp.eventId,
      );

      // console.log("userRSVP", userRSVP);

      // If this RSVP is different, update RSVP
      if (userRSVP) {
        // console.log("update rsvp");
        // console.log("rsvp", rsvp);

        // console.log("before passengers", userRSVP.memberPassengers);
        // console.log("after passengers", rsvp.memberPassengers);
        // console.log("guests", rsvp.guestCount);
        // console.log("before", oldMembersSet);
        // console.log("after", newMembersSet);
        // console.log(
        //   "to remove",
        //   memberPassengersNoLongerAttending,
        //   [...memberPassengersNoLongerAttending].map(passenger => ({
        //     id: passenger
        //   }))
        // );
        // console.log(
        //   "to add",
        //   memberPassengersNotYetAttending,
        //   [...memberPassengersNotYetAttending].map(passenger => ({
        //     id: passenger
        //   }))
        // );

        // is there an existing vehicle on this rsvp? do they match?
        // do nothing
        // is there no existing vehicle but member is now bringing one?
        // connect
        // is there an existing vehicle but member is no longer bringing one?
        // disconnect

        // Is changeDisabled?
        if (userRSVP["event.changeDisabled"] && userRSVP.status !== null) {
          throw new Error(
            "You cannot change your RSVP once it has been submitted.",
          );
        }

        const vehicle =
          !userRSVP.vehicle && rsvp.vehicle
            ? { vehicle: rsvp.vehicle } // no existing vehicle but member is now bringing one
            : userRSVP.vehicle && !rsvp.vehicle
              ? { vehicle: null } // existing vehicle but member is no longer bringing one
              : {}; // existing vehicle on this rsvp, no change needed

        await ctx
          .db("rsvp")
          .update({
            status: rsvp.status,
            equipment: rsvp.equipment || null,
            guest_count: rsvp.guestCount,
            is_rider: !rsvp.vehicle ? true : rsvp.isRider,
            ...vehicle,
          })
          .where({ id: userRSVP.id });

        return { message: "Your RSVP has been recorded." };
      }

      // If RSVP is missing, record RSVP

      // 1. If rider RSVP:
      //   cannot have member guests of their own
      //   cannot have non member guests of their own
      // 2. If driver RSVP has member guests:
      //   create yes RSVP for member guests if they dont exist
      //     add chaperone
      //   update member guests RSVP to yes if they do exist
      //     add chaperone

      const vehicle =
        userRSVP && !userRSVP.vehicle && rsvp.vehicle
          ? { vehicle: rsvp.vehicle } // no existing vehicle but member is now bringing one
          : userRSVP && userRSVP.vehicle && !rsvp.vehicle
            ? { vehicle: null } // existing vehicle but member is no longer bringing one
            : {}; // existing vehicle on this rsvp, no change needed

      const rsvpId = cuid();

      await Promise.all([
        ctx.db("rsvp").insert({
          id: rsvpId,
          status: rsvp.status,
          // equipment: rsvp.equipment || null,
          guest_count: rsvp.guestCount,
          is_rider: rsvp.isRider || false,
          member: rsvp.userId,
          event: rsvp.eventId,
          ...vehicle,
        }),
        ctx.db("_members_rsvp").insert({ a: rsvp.userId, b: rsvpId }),
        // ctx.db("rsvp_equipment").insert({
        //   node_id: rsvpId,
        //   position: "", // Increments of 1000 for each equipment item
        //   value: "",
        // }),
      ]);

      return { message: "Thank you for RSVPing" };
    },
  },
};

export default events;
