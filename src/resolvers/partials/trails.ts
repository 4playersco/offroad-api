import {
  hasRole,
  hasAccountStatus,
  hasAccountType,
  convertKeysToSnakeCase,
} from "@/lib";
import { AccountStatus, AccountType, Role } from "@/types/enums";

import cuid from "@bugsnag/cuid";

const trails = {
  queries: {
    getTrails(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);

      // If they do, query all the trails
      return ctx.db.select("*").from("trail");
    },
    getTrail(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account status?
      hasRole(ctx.user, [
        Role.ADMIN,
        Role.OFFICER,
        Role.RUN_MASTER,
        Role.RUN_LEADER,
      ]);
      hasAccountStatus(ctx.user, [
        AccountStatus.ACTIVE,
        AccountStatus.PAST_DUE,
      ]);
      hasAccountType(ctx.user, [AccountType.FULL]);

      // If they do, query the trail
      return ctx.db.select("*").from("trail").where({ slug: args.slug });
    },
  },
  mutations: {
    async createTrail(parent: unknown, args: any, ctx: ExtraContext) {
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

      const { trail } = args;
      const { featuredImage, newFeaturedImage, ...filteredTrail } = trail;
      const data = { ...filteredTrail };

      // Is a new featured image assigned?
      if (newFeaturedImage) {
        const newImageId = cuid();
        // New featured image submitted
        await ctx.db("cloudinary_image").insert({
          id: newImageId,
          ...convertKeysToSnakeCase(newFeaturedImage),
        });

        data.featured_image = newImageId;
      } else {
        // Do nothing. We can't be sure the old featured image isn't in use anywhere else
      }

      await ctx.db("trail").insert(convertKeysToSnakeCase(data));

      return { message: "Your trail has been created" };
    },
    async updateTrail(parent: unknown, args: any, ctx: ExtraContext) {
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

      const { trail, id: trailId } = args;
      const { newFeaturedImage, featuredImage, ...filteredTrail } = trail;

      // Get current trail for later comparison
      const [existingTrail] = await ctx.db
        .select("*")
        .from("trail")
        .where({ id: trailId });

      const data = { ...filteredTrail };

      if (newFeaturedImage) {
        const newImageId = cuid();
        // New featured image submitted
        await ctx.db("cloudinary_image").insert({
          id: newImageId,
          ...convertKeysToSnakeCase(newFeaturedImage),
        });

        data.featured_image = newImageId;
      } else if (
        existingTrail.featuredImage &&
        existingTrail.featuredImage.publicId &&
        !newFeaturedImage
      ) {
        // Remove old featured image
        data.featuredImage = null;
      }

      await ctx
        .db("trail")
        .update(convertKeysToSnakeCase(data))
        .where({ id: trailId });

      return { message: "Your trail has been updated" };
    },
    async updateTrailImage(parent: unknown, args: any, ctx: ExtraContext) {
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

      const { id, image } = args;
      const newImageId = cuid();

      await Promise.all([
        ctx.db("cloudinary_image").insert({
          id: newImageId,
          ...convertKeysToSnakeCase(image),
        }),
        ctx.db("trail").update({ featured_image: newImageId }).where({ id }),
      ]);

      return { message: "Your trail photo has been updated" };
    },
  },
};

export default trails;
