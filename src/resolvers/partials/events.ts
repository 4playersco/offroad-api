import {
  hasRole,
  hasAccountStatus,
  convertKeysToSnakeCase,
} from "@/server/lib";
import { defaultPaginationSize } from "@/server/constants";
import {
  AccountStatus,
  AccountType,
  Role,
  EventRsvp,
  EventType,
} from "@/types/main";
import { ExtraContext } from "@/server/types";
import cuid from "@bugsnag/cuid";

const events = {
  queries: {
    async getUpcomingEvents(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const { count, page } = args;

      // No page? Show all
      if (!page && !count) {
        return ctx.db
          .select("*")
          .from("event")
          .where("start_time", ">=", new Date().toISOString())
          .orderBy("start_time ASC");
      }

      const skip = (page - 1) * defaultPaginationSize;

      return ctx.db
        .select("*")
        .from("event")
        .where("start_time", ">=", new Date().toISOString())
        .orderBy("start_time ASC")
        .limit(count || defaultPaginationSize)
        .offset(skip <= 0 ? 0 : skip);
    },
    async upcomingEventsCount(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const results = await ctx.db
        .count("id")
        .from("event")
        .where("start_time", ">=", new Date().toISOString());

      return { count: results };
    },
    async getUserEvents(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper role?
      hasRole(ctx.user, [Role.ADMIN, Role.OFFICER, Role.RUN_MASTER]);

      // Requesting user has proper account type?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const id =
        args.username === "self"
          ? ctx?.user?.id
          : await ctx.db
              .select("id")
              .from("user")
              .where({ username: args.username });

      return ctx.db
        .select("event.*")
        .from("event")
        .innerJoin("rsvp", "rsvp.event", "event.id")
        .where((qb: typeof ctx.db) => {
          // Start time >= now, rsvp status is GOING
          qb.where("start_time", ">=", new Date().toISOString()).andWhere(
            "rsvp.status",
            "=",
            "GOING",
          );

          // Filter by event type if needed
          if (args.eventType) {
            qb.andWhere("event.type", "=", args.eventType);
          }

          // Determine where to filter by member ID or user ID
          qb.where({ "rsvp.member": id });
        })
        .orderBy("start_time DESC");
    },
    async getPastEvents(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const { count, page } = args;

      // No page? Show all
      if (!page && !count) {
        return ctx.db
          .select("*")
          .from("event")
          .where("start_time", "<", new Date().toISOString())
          .orderBy("start_time DESC");
      }

      const skip = (page - 1) * defaultPaginationSize;

      return ctx.db
        .select("*")
        .from("event")
        .where("start_time", "<", new Date().toISOString())
        .orderBy("start_time DESC")
        .limit(count || defaultPaginationSize)
        .offset(skip <= 0 ? 0 : skip);
    },
    async pastEventsCount(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const results = await ctx.db
        .count("id")
        .from("event")
        .where("start_time", "<", new Date().toISOString());

      return { count: results };
    },
    async getEvent(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const result = await ctx.db
        .select("*")
        .from("event")
        .where({ id: args.eventId });

      if (!result || !result[0]) {
        throw new Error("Event cannot be found");
      }

      if (result[0].membersOnly && ctx.user.accountType === AccountType.GUEST) {
        throw new Error("You cheeky bastard! Nice try.");
        // Email webmaster
      }

      return result;
    },
    async getNextEvent(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const results = await ctx.db
        .select("*")
        .from("event")
        .where("start_time", ">=", new Date().toISOString())
        .orderBy("start_time ASC")
        .limit(1);

      return results.length > 0 ? results[0] : null;
    },
    // async getMyNextEvent(parent: any, args: any, ctx: ExtraContext) {
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
    async createEvent(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      hasRole(ctx.user, [Role.ADMIN, Role.OFFICER, Role.RUN_MASTER]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const { event } = args;

      const [host] = await ctx.db
        .select("id, vehicle")
        .from("user")
        .where({ email: event.host });

      // Create event, RSVP
      const eventId = cuid();
      const rsvpId = cuid();

      await Promise.all([
        ctx.db("event").insert({
          id: eventId,
          type: event.type,
          title: event.title,
          description: event.description || "",
          start_time: new Date(event.startTime).toISOString(),
          end_time: new Date(event.endTime).toISOString(),
          address: event.address || "",
          trail_difficulty: event.trailDifficulty || "",
          // trailNotes: event.trailNotes,
          featured_image: event.featuredImage || null,
          rally_address: event.rallyAddress || "",
          members_only: event.membersOnly,
          max_attendees: event.maxAttendees || -1,
          max_rigs: event.maxRigs || -1,
          change_disabled: event.changeDisabled || false,
          creator: ctx.user.id,
          host: host.id,
        }),
        ctx.db("_event_trail").insert({
          a: eventId,
          b: event.trail,
        }),
        ctx.db("rsvp").insert({
          id: rsvpId,
          member: host.id,
          event: eventId,
          vehicle: host.vehicle,
          status: EventRsvp.GOING,
        }),
        ctx.db("_members_rsvp").insert({
          a: host.id,
          b: rsvpId,
        }),
      ]);

      return { message: "Your event has been created" };
    },
    async deleteEvent(parent: any, args: any, ctx: any) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      hasRole(ctx.user, [Role.ADMIN, Role.OFFICER, Role.RUN_MASTER]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const { id: eventId } = args;

      const existingEvent = await ctx.db
        .select("title", "featured_image")
        .from("event")
        .where({ id: eventId });

      const existingRsvps = await ctx.db
        .select("id")
        .from("rsvp")
        .where({ event: eventId });

      try {
        // Delete featured image
        if (existingEvent[0].featuredImage && existingEvent.featured_image) {
          await ctx
            .db("cloudinary_image")
            .where({ id: existingEvent.featured_image })
            .delete();
        }

        // Delete _event_trail pivot entry
        await ctx.db("_event_trail").where({ a: eventId }).delete();

        // Delete rsvps
        if (existingRsvps && existingRsvps.length > 0) {
          const ids = existingRsvps.map(({ id }: { id: string }) => id);
          await ctx.db("rsvp").whereIn("id", ids).delete();
        }

        // Delete event
        await ctx.db("event").where({ id: eventId }).delete();

        return { message: `${existingEvent.title} event has been deleted` };
      } catch (e) {
        console.error(e);
        throw new Error("Could not delete event");
      }
    },
    async updateEvent(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      hasRole(ctx.user, [Role.ADMIN, Role.OFFICER, Role.RUN_LEADER]);

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      const { event, id: eventId } = args;

      // Get current event for later comparison
      const [existingEvent] = await ctx.db
        .select("id", "host", "featured_image")
        .from("event")
        .where({ id: eventId })
        .limit(1);

      const existingRsvps = await ctx.db
        .select("id")
        .from("rsvp")
        .where({ event: eventId });

      const [existingTrail] = await ctx.db
        .select("id")
        .from("_event_trail")
        .where({ a: eventId })
        .limit(1);

      const [newHost] = await ctx.db
        .select("id")
        .from("user")
        .where({ username: event.host })
        .limit(1);

      const data = {
        title: event.title,
        type: event.type,
        description: event.description || "",
        start_time: new Date(event.startTime).toISOString(),
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
        featured_image: event.featuredImage || existingEvent.featured_image,
      };

      // Does host need an RSVP?
      if (
        existingRsvps &&
        !existingRsvps.find((rsvp: any) => rsvp.member === newHost.id)
      ) {
        const rsvpId = cuid();
        await Promise.all([
          ctx.db("rsvp").insert({
            id: rsvpId,
            member: newHost.id,
            event: eventId,
            status: EventRsvp.GOING,
          }),
          ctx.db("_members_rsvp").insert({
            a: newHost.id,
            b: rsvpId,
          }),
        ]);
      }

      // Is a new trail assigned?
      if (event.trail && event.trail !== "0") {
        await ctx.db("_event_trail").insert({ a: eventId, b: event.trail });
      } else if (existingEvent.trail && existingTrail.id && !event.trail) {
        // Remove old trail
        await ctx.db("_event_trail").where({ a: eventId }).delete();
      }

      // Is a new featured image assigned?
      if (event.newFeaturedImage) {
        const newImageId = cuid();
        // New featured image submitted
        await ctx.db("cloudinary_image").insert({
          id: newImageId,
          ...convertKeysToSnakeCase(event.newFeaturedImage),
        });

        data.featured_image = newImageId;
      } else {
        // Do nothing. We can't be sure the old featured image isn't in use anywhere else
        data.featured_image = null;
      }

      await ctx.db("event").update(data).where({ id: eventId });

      return { message: "Your event has been updated" };
    },
    async setRSVP(parent: any, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      const { rsvp } = args;

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      // Requesting user has proper role?
      if (ctx?.user?.id !== rsvp.userId) {
        hasRole(ctx.user, [Role.ADMIN, Role.OFFICER]);
      }

      // Query the current user
      // @TODO Start back up from here
      const [currentUser] = await ctx.db
        .select("id", "account_status", "account_type")
        .from("user")
        .where({ id: rsvp.userId })
        .limit(1);

      // Query the current upcoming RSVPs
      const currentUserRsvps = await ctx.db
        .from("rsvp")
        .select(
          "rsvp.id",
          "rsvp.status",
          "rsvp.event",
          "rsvp.vehicle",
          "rsvp.guest_count",
          "event.change_disabled",
        )
        .innerJoin("event", "event.id", "rsvp.event")
        .where({ "rsvp.member": rsvp.userId })
        .andWhere("rsvp.start_time", ">=", new Date().toISOString());

      if (!currentUser) {
        throw new Error("User does not have permission");
      }

      if (
        currentUser.accountStatus !== AccountStatus.ACTIVE &&
        currentUser.accountStatus !== AccountStatus.PAST_DUE
      ) {
        throw new Error("Guest does not have permission");
      }

      if (currentUser.accountType === "GUEST") {
        const currentGuestRsvps = await ctx.db
          .select("rsvp.id", "rsvp.status")
          .from("rsvp")
          .innerJoin("event", "event.id", "rsvp.event")
          .where({ "rsvp.member": rsvp.userId })
          .andWhere({ "rsvp.status": EventRsvp.GOING })
          .andWhere({ "event.type": EventType.RUN })
          .andWhere("rsvp.start_time", ">=", new Date().toISOString())
          .limit(4);

        if (
          currentGuestRsvps[0].length >= 3 &&
          rsvp.status === EventRsvp.GOING
        ) {
          throw new Error(
            "Guests can only attend 3 runs. Please become a member to attend more.",
          );
        }
      }

      // Has this user already RSVPd?
      const userRSVP = currentUserRsvps.find(
        (eventRSVP: any) => eventRSVP.id === rsvp.eventId,
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
