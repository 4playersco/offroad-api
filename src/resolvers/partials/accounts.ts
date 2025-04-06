import { promisify } from "util";
import fetch from "node-fetch";
import { v2 as cloudinary } from "cloudinary";
import mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";

import {
  determineTitleChanges,
  determineOfficeChanges,
  getDuesAmount,
  convertToCents,
  sendTransactionalEmail,
  getRemindWebmasterToSubscribeEmail,
  stripe,
  convertKeysToSnakeCase,
  hasRole,
  hasAccountType,
  hasAccountStatus,
} from "@/lib";
import { duesPaid, accountChanged } from "@/lib/membership-log";

import {
  AccountStatus,
  AccountType,
  NewsletterAction,
  NewsletterList,
  Role,
} from "@/types/enums";

import { isSelf } from "@/lib/accounts";
import snakeCase from "lodash/snakeCase";
import cuid from "@bugsnag/cuid";
import { newProfilePhoto, newRigbookPhoto } from "@/lib/activity-log";
import type { ExtraContext } from "@/types/server";

cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const promisifiedDestroy = promisify(cloudinary.uploader.destroy);

const accounts = {
  queries: {
    async getMembershipLogItems(
      parent: unknown,
      args: { username: string; messageCode: string },
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Requesting user has proper account type?
      if (
        !hasAccountType(
          ctx.user,
          [AccountType.FULL, AccountType.ASSOCIATE],
          false,
        )
      ) {
        return [];
      }

      const id =
        args.username.toLowerCase() === "self"
          ? ctx.user.id
          : hasAccountStatus(ctx.user, [
                AccountStatus.ACTIVE,
                AccountStatus.PAST_DUE,
              ]) && hasRole(ctx.user, [Role.ADMIN, Role.OFFICER])
            ? await ctx.db
                .select("id")
                .from("user")
                .where({ username: args.username })
            : null;

      return ctx.db
        .select("*")
        .from("membership_log_item")
        .where({ messageCode: args.messageCode })
        .andWhere({ user: id })
        .orderBy("time DESC");
    },
    async notifications(parent: unknown, args: unknown, ctx: ExtraContext) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      // Get all user_meta IDs that belong to user
      const results = await ctx.db
        .select("b")
        .from("_user_meta")
        .where("a", ctx.user.id)
        .limit(1);

      if (results && results[0]) {
        const userMetaId = results[0];
        // Show me the metadata
        return ctx.db.select("*").from("user_meta").where("id", userMetaId);
      }

      return null;
    },
    async newsletterPreferences(
      parent: unknown,
      args: { list: NewsletterList },
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("You must be logged in");
      }

      mailchimp.setConfig({
        apiKey: process.env.NEWSLETTER_API_KEY,
        server: process.env.NEWSLETTER_API_SERVER,
      });

      const list =
        args.list === NewsletterList.MEMBERS
          ? (process.env.NEWSLETTER_LIST_MEMBERS ?? "")
          : (process.env.NEWSLETTER_LIST_GENERAL ?? "");

      try {
        const subscriberHash = md5(ctx.user.email.toLowerCase());

        // the MD5 hash of the lowercase version of the list member's email address
        const result = await mailchimp.lists.getListMember(
          list,
          subscriberHash,
        );

        return {
          status:
            result.status === "subscribed"
              ? NewsletterAction.SUBSCRIBE
              : NewsletterAction.UNSUBSCRIBE,
        };
      } catch (error: unknown) {
        if ((error as { status?: number }).status === 404) {
          return { status: NewsletterAction.UNSUBSCRIBE };
        } else {
          console.log(error);
          throw new Error("Failed to unsubscribe email");
        }
      }
    },
  },
  mutations: {
    async payMembershipDues(
      parent: unknown,
      args: { data: { token: string } },
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      if (
        !hasAccountType(
          ctx.user,
          [AccountType.FULL, AccountType.ASSOCIATE],
          true,
        )
      ) {
        throw new Error(
          `Account type must be FULL or ASSOCIATE to proceed. Please contact the webmaster.`,
        );
      }

      // Requesting user has proper account status?
      if (
        !hasAccountStatus(
          ctx.user,
          [AccountStatus.PAST_DUE, AccountStatus.ACTIVE],
          false,
        )
      ) {
        throw new Error(
          `Account status must be ACTIVE or PAST_DUE to proceed. Contact the board to request reinstatement`,
        );
      }

      const { token } = args.data;

      // Confirm all `payingFor` IDs eligible for payment?
      // const fullMemberCount = x;
      // const associateMemberDues = y;

      // Recalculate amount due (confirm)
      // const duesAmount = getDuesAmountIncludingFees(x, y);
      const duesAmount = getDuesAmount();

      // if (args.amount !== duesAmount) {
      //   throw new Error(
      //     "Amount received does not match expected amount. Contact the webmaster"
      //   );
      // }

      // Submit to stripe
      try {
        const charge = await stripe.charges.create({
          amount: convertToCents(duesAmount),
          currency: "USD",
          source: token,
        });

        if (charge.status === "succeeded") {
          // Create membership log entry for payer
          await Promise.all([
            ctx
              .db("user")
              .update({ accountStatus: AccountStatus.ACTIVE })
              .where({ id: ctx.user.id }),
            ctx.db("membership_log_item").insert(
              accountChanged({
                stateName: "Account status",
                newState: AccountStatus.ACTIVE,
                userId: ctx.user.id,
              }),
            ),
            ctx
              .db("membership_log_item")
              .insert(duesPaid(String(duesAmount), ctx.user.id)),
          ]);

          // Create membership log entry for other recipients
          // Send email to payer and recipients

          return {
            message: "Dues payment was successful.",
          };
        } else {
          throw new Error(charge.failure_message || "Error processing charge");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async logMembershipEvent(
      parent: unknown,
      args: { date: string; message: string; code: string; userId: string },
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      if (!hasRole(ctx.user, [Role.ADMIN, Role.OFFICER], false)) {
        throw new Error(
          "User profile can only be updated by an admin or an officer",
        );
      }

      // Requesting user has proper account status?
      if (!hasAccountStatus(ctx.user, [AccountStatus.ACTIVE], false)) {
        throw new Error(`Account status must be ACTIVE to proceed.`);
      }

      await ctx.db("membership_log_item").insert({
        time: args.date, // Browser time
        message: args.message,
        message_code: args.code,
        user: args.userId,
        logger: ctx.user.id,
      });

      return { message: "Item successfully logged" };
    },
    async logActivityEvent(
      parent: unknown,
      args: {
        time: string;
        message: string;
        messageCode: string;
        username: string;
        link?: string;
      },
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      // Have proper roles to do this?
      if (!hasRole(ctx.user, [Role.ADMIN, Role.OFFICER], false)) {
        throw new Error(
          "User profile can only be updated by an admin or an officer",
        );
      }

      // Requesting user has proper account status?
      if (!hasAccountStatus(ctx.user, [AccountStatus.ACTIVE], false)) {
        throw new Error(`Account status must be ACTIVE to proceed.`);
      }

      await ctx.db("activity_log_item").insert({
        time: args.time, // Browser time
        message: args.message,
        message_code: args.messageCode,
        user: args.username,
        link: args.link || null,
        logger: ctx.user.id,
      });

      return { message: "Item successfully logged" };
    },
    async notifications(
      parent: unknown,
      args: { settings: Record<string, boolean> },
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      const [user] = await ctx.db
        .select(
          "user.id",
          "user.first_name",
          "user.last_name",
          "user.email",
          "_user_meta.b AS userMetaId",
        )
        .from("user")
        .innerJoin("_user_meta", "_user_meta.a", "user.id")
        .where({ id: ctx.user.id })
        .limit(1);

      if (user && user.userMeta) {
        const { id } = user.userMeta;
        const settings = Object.entries(args.settings);
        const [key, value] = settings[0];

        // Update settings
        await ctx
          .db("user_meta")
          .update({ [snakeCase(key)]: value })
          .where({ id });

        const { firstName, lastName, email } = user;
        const lowercaseEmail = email.toLowerCase();

        const emailDetails = getRemindWebmasterToSubscribeEmail({
          email: lowercaseEmail,
          firstName,
          lastName,
          action: value ? "subscribe" : "unsubscribe",
          newsletter: key,
        });

        // Send webmaster reminder email
        return sendTransactionalEmail(emailDetails)
          .then(() => ({
            message: "Setting successfully updated",
          }))
          .catch((err) => {
            throw new Error(err.toString());
          });
      }

      throw new Error("Unable to update notifications settings");
    },
    async editNewsletterPreferences(
      parent: unknown,
      args: {
        settings: Record<string, boolean>;
        list: NewsletterList;
        action: NewsletterAction;
      },
      ctx: ExtraContext,
    ) {
      // Logged in?
      if (!ctx?.user?.id) {
        throw new Error("User must be logged in");
      }

      const list =
        args.list === NewsletterList.MEMBERS
          ? (process.env.NEWSLETTER_LIST_MEMBERS ?? "")
          : (process.env.NEWSLETTER_LIST_GENERAL ?? "");

      const email = ctx.user.email.toLowerCase();
      const subscriberHash = md5(email);

      mailchimp.setConfig({
        apiKey: process.env.NEWSLETTER_API_KEY,
        server: process.env.NEWSLETTER_API_SERVER,
      });

      // get user
      const [user] = await ctx.db
        .select(
          "id",
          "first_name",
          "last_name",
          "email",
          "account_status",
          "account_type",
        )
        .from("user")
        .where({ id: ctx?.user?.id })
        .limit(1);

      // getListMember from mailchimp
      let mailchimpUser = null;

      try {
        const result = await mailchimp.lists.getListMember(
          list,
          subscriberHash,
        );
        mailchimpUser = result;
      } catch (error) {
        console.error(error);
      }

      // SUBSCRIBE
      if (args.action === NewsletterAction.SUBSCRIBE) {
        // Non-members cannot subscribe to membership newsletter
        if (
          args.list === NewsletterList.MEMBERS &&
          (![AccountStatus.ACTIVE, AccountStatus.PAST_DUE].includes(
            user.accountStatus,
          ) ||
            user.accountType === AccountType.GUEST)
        ) {
          throw new Error("Non-member cannot subscribe to membership list");
        }

        // if mailchimp user found, update:
        if (mailchimpUser) {
          try {
            await mailchimp.lists.updateListMember(list, subscriberHash, {
              status: "subscribed",
            });
            return { message: "Email successfully subscribed" };
          } catch (error) {
            const text = JSON.parse(error.response.res.text);

            if (error.status === 400 && text.title === "Member Exists") {
              throw new Error("Email already subscribed");
            } else {
              throw new Error("Failed to subscribe email");
            }
          }
        } else {
          // if no mailchimp user found, add:
          try {
            await mailchimp.lists.addListMember(list, {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                FNAME: user.firstName,
                LNAME: user.lastName,
              },
            });

            return { message: "Email successfully subscribed" };
          } catch (error) {
            const text = JSON.parse(error.response.res.text);

            if (error.status === 400 && text.title === "Member Exists") {
              throw new Error("Email already subscribed");
            } else {
              throw new Error("Failed to subscribe email");
            }
          }
        }
      }

      // UNSUBSCRIBE
      // if mailchimp user found, update:
      if (mailchimpUser) {
        try {
          // the MD5 hash of the lowercase version of the list member's email address
          await mailchimp.lists.updateListMember(list, subscriberHash, {
            status: "unsubscribed",
          });

          return { message: "Email successfully unsubscribed" };
        } catch (err) {
          throw new Error("Failed to unsubscribe email");
        }
      } else {
        // if no mailchimp user found, do nothing
        return { message: "Nothing to do, email not subscribed" };
      }
    },
  },
  // async convertToMember(parent: unknown, args: any, ctx: ExtraContext) {
  // Set joined date
  // Set account_type to FULL / ASSOCIATE
  // Set account_status to PAST_DUE
  // Set members list subscription to true
  // Create membership log entry
  // Create activity log entry
  // },
  async updateUserProfileSettings(
    parent: unknown,
    args: {
      firstName: string;
      lastName: string;
      username: string;
      gender: "male" | "female" | "non-binary" | "other" | null;
      birthdate: string | number | Date;
      joined: string | null;
      comfortLevel: string | number | null;
      street: string;
      city: string;
      state: string;
      zip: string;
      phone: string;
      emergencyContactName: string;
      emergencyContactPhone: string;
      showPhoneNumber: boolean;
      vehicle: {
        id: string;
        outfitLevel?: number;
        mods: string[];
        [key: string]: string | number | boolean | null | string[];
      };
      id: string;
    },
    ctx: ExtraContext,
  ) {
    // Logged in?
    if (!ctx?.user?.id) {
      throw new Error("User must be logged in");
    }

    // Have proper roles to do this?
    if (
      hasRole(ctx.user, [Role.ADMIN, Role.OFFICER], false) ||
      isSelf(ctx.user, args.id, false)
    ) {
      // Query the current user
      const [existingContactInfo] = await ctx.db
        .select("b AS id")
        .from("_user_contact_info")
        .where({ a: args.id })
        .limit(1);

      const [existingPreferences] = await ctx.db
        .select("b AS id")
        .from("_user_preferences")
        .where({ a: args.id })
        .limit(1);

      // Update user
      await ctx
        .db("user")
        .update({
          firstName: args.firstName,
          lastName: args.lastName,
          username: args.username,
          gender: args.gender,
          birthdate: new Date(args.birthdate).toISOString(),
          joined: args.joined ? new Date(args.joined).toISOString() : null,
          comfortLevel: args.comfortLevel,
        })
        .where({ id: args.id });

      if (existingContactInfo) {
        // Update existing contact_info entry
        await ctx
          .db("contact_info")
          .update({
            street: args.street,
            city: args.city,
            state: args.state,
            zip: args.zip,
            phone: args.phone,
          })
          .where({ id: existingContactInfo.id });
      } else {
        const newContactInfoId = cuid();

        await Promise.all([
          // Create contact_info entry
          ctx.db("contact_info").insert({
            id: newContactInfoId,
            street: args.street,
            city: args.city,
            state: args.state,
            zip: args.zip,
            phone: args.phone,
          }),
          // Connect user to contact info entry
          ctx.db("_user_contact_info").insert({
            a: args.id,
            b: newContactInfoId,
          }),
        ]);
      }

      if (existingPreferences) {
        // Update existing preference entry
        await ctx
          .db("preference")
          .update({
            emergency_contact_name: args.emergencyContactName,
            emergency_contact_phone: args.emergencyContactPhone,
            show_phone_number: args.showPhoneNumber,
          })
          .where({ id: existingPreferences.id });
      } else {
        const newPrefId = cuid();

        await Promise.all([
          // Create preference entry
          ctx.db("preference").insert({
            id: newPrefId,
            emergency_contact_name: args.emergencyContactName,
            emergency_contact_phone: args.emergencyContactPhone,
            show_phone_number: args.showPhoneNumber,
          }),
          // Connect user to preference entry
          ctx.db("_user_preferences").insert({
            a: args.id,
            b: newPrefId,
          }),
        ]);
      }

      return { message: "User profile settings updated" };
    } else {
      throw new Error(
        "User profile can only be updated by the user, an admin, or an officer",
      );
    }
  },
  async updateUserAdminProfileSettings(
    parent: unknown,
    args: {
      id: string;
      data: {
        accountType: AccountType;
        accountStatus: AccountStatus;
        role: Role;
        office: string | null;
        titles: string[];
      };
    },
    ctx: ExtraContext,
  ) {
    // Logged in?
    if (!ctx?.user?.id) {
      throw new Error("User must be logged in");
    }

    // Have proper roles to do this?
    if (!hasRole(ctx.user, [Role.ADMIN, Role.OFFICER], false)) {
      throw new Error(
        "User profile can only be updated by an admin or an officer",
      );
    }

    // Requesting user has proper account status?
    hasAccountStatus(ctx.user, [AccountStatus.ACTIVE, AccountStatus.PAST_DUE]);

    const {
      data: { titles, ...restData },
    } = args;

    // Query the current user
    const [currentUser] = await ctx.db
      .select("id", "account_type", "account_status", "role", "office")
      .from("user")
      .where({ id: args.id });

    const [currentTitles] = await ctx.db
      .select("value AS title")
      .from("user_titles")
      .where({ node_id: args.id });

    let membershipLogs = [];

    const [titlesToRemove, titlesToAdd, titleLogs] = determineTitleChanges(
      currentTitles,
      titles,
      ctx.user.id,
      args.id,
    );

    membershipLogs = [...membershipLogs, ...titleLogs];

    const [officeToRemove, officeToAdd, officeLogs] = determineOfficeChanges(
      currentUser.office,
      restData.office,
      ctx.user.id,
      args.id,
    );

    membershipLogs = [...membershipLogs, ...officeLogs];

    if (currentUser.role !== restData.role) {
      membershipLogs.push(
        accountChanged({
          stateName: "Role",
          newState: restData.role,
          userId: ctx?.user?.id,
        }),
      );
    }

    if (currentUser.accountStatus !== restData.accountStatus) {
      membershipLogs.push(
        accountChanged({
          stateName: "Account status",
          newState: restData.accountStatus,
          userId: ctx?.user?.id,
        }),
      );
    }

    if (currentUser.accountType !== restData.accountType) {
      membershipLogs.push(
        accountChanged({
          stateName: "Account type",
          newState: restData.accountType,
          userId: ctx?.user?.id,
        }),
      );
    }

    return Promise.all([
      // Update user
      ctx
        .db("user")
        .update(convertKeysToSnakeCase(restData))
        .where({ id: args.id }),
      // Remove stale titles
      titlesToRemove.forEach(async (title: string) =>
        ctx
          .db("user_titles")
          .where({ value: title, node_id: args.userId })
          .delete(),
      ),
      // Add new titles
      titlesToAdd.forEach(async (title: string) =>
        ctx
          .db("user_titles")
          .insert({ node_id: cuid(), position: 1000, value: title }),
      ),
      // Add corresponding log entries
      membershipLogs.forEach(async (log: any) =>
        ctx.db("membership_log_item").insert(accountChanged(log)),
      ),
    ]);

    return { message: "User profile settings updated" };
  },
  async updateAvatar(parent: unknown, args: any, ctx: ExtraContext) {
    // Logged in?
    if (!ctx?.user?.id) {
      throw new Error("User must be logged in");
    }

    const { data } = args;
    const { old: oldAvatar, new: newAvatar } = data;

    if (oldAvatar) {
      // Delete old image via Cloudinary API
      const formData = {
        api_key: process.env.CLOUDINARY_KEY,
        public_id: oldAvatar.publicId,
      };

      try {
        await fetch(
          "https://api.cloudinary.com/v1_1/fourplayers/image/destroy",
          {
            method: "POST",
            // @ts-ignore
            body: formData,
          },
        );

        // Delete old image record
        await ctx
          .db("cloudinary_image")
          .where({ public_id: oldAvatar.publicId })
          .delete();
      } catch (e) {
        console.error(e);
        throw new Error("Unable to remove old avatar");
      }
    }

    // Update user
    const newAvatarId = cuid();

    await Promise.all([
      // Update user record
      ctx
        .db("user")
        .update({
          avatar: newAvatarId,
        })
        .where({ id: ctx.user.id }),
      // Create new image record
      ctx.db("cloudinary_image").insert({
        id: newAvatarId,
        public_id: newAvatar.publicId,
        url: newAvatar.url,
        small_url: newAvatar.smallUrl,
      }),
      // Create corresponding log entry
      ctx
        .db("activity_log_item")
        .insert(newProfilePhoto(ctx.user.username, ctx.user.id)),
    ]);

    return { message: "Avatar updated" };
  },
  async deleteAvatar(parent: unknown, args: any, ctx: ExtraContext) {
    // Logged in?
    if (!ctx?.user?.id) {
      throw new Error("User must be logged in");
    }

    const { avatar } = args;

    // Remove from Cloudinary
    try {
      const cloudinaryResults = await promisifiedDestroy(avatar.publicId);

      if (cloudinaryResults && cloudinaryResults.result !== "ok") {
        throw new Error(cloudinaryResults);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete old avatar");
    }

    await Promise.all([
      // Remove avatar from user record
      ctx.db("user").update({ avatar: null }).where({ id: ctx.user.id }),
      // Delete old image record
      await ctx
        .db("cloudinary_image")
        .where({ public_id: avatar.publicId })
        .delete(),
    ]);

    return { message: "Avatar deleted" };
  },
  async updateRig(parent: unknown, args: any, ctx: ExtraContext) {
    // Logged in?
    if (!ctx?.user?.id) {
      throw new Error("User must be logged in");
    }

    const { data } = args;
    const { old: oldRig, new: newRig } = data;

    if (oldRig) {
      // Remove from Cloudinary
      try {
        const cloudinaryResults = await promisifiedDestroy(oldRig.publicId);

        if (cloudinaryResults.result !== "ok") {
          throw new Error("Unable to delete old rig image", cloudinaryResults);
        }

        // Delete old image record
        await ctx
          .db("cloudinary_image")
          .where({ public_id: oldRig.publicId })
          .delete();
      } catch (e) {
        console.error(e);
        throw new Error("Unable to delete old rig image");
      }
    }

    // Update user
    const newRigId = cuid();

    await Promise.all([
      // Update user record
      ctx
        .db("user")
        .update({
          rig: newRigId,
        })
        .where({ id: ctx.user.id }),
      // Create new image record
      ctx.db("cloudinary_image").insert({
        id: newRigId,
        public_id: newRig.publicId,
        url: newRig.url,
        small_url: newRig.smallUrl,
      }),
      // Create corresponding log entry
      ctx
        .db("activity_log_item")
        .insert(newRigbookPhoto(ctx.user.username, ctx.user.id)),
    ]);

    return { message: "Rig image updated" };
  },
  async deleteRig(parent: unknown, args: any, ctx: ExtraContext) {
    // Logged in?
    if (!ctx?.user?.id) {
      throw new Error("User must be logged in");
    }

    const { rig } = args;

    // Remove from Cloudinary
    try {
      const cloudinaryResults = await promisifiedDestroy(rig.publicId);

      if (cloudinaryResults && cloudinaryResults.result !== "ok") {
        throw new Error(cloudinaryResults);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete old rig image");
    }

    await Promise.all([
      // Remove rig from user record
      ctx.db("user").update({ rig: null }).where({ id: ctx.user.id }),
      // Delete old image record
      await ctx
        .db("cloudinary_image")
        .where({ public_id: rig.publicId })
        .delete(),
    ]);

    return { message: "Rig image deleted" };
  },
  async updateVehicle(parent: unknown, args: any, ctx: ExtraContext) {
    // Logged in?
    if (!ctx?.user?.id) {
      throw new Error("User must be logged in");
    }

    const { vehicle, id: vehicleId } = args;
    const { outfitLevel, mods: newMods, ...restVehicle } = vehicle;

    const [oldMods] = await ctx.db
      .select("value AS mod")
      .from("vehicle_mods")
      .where({ node_id: vehicleId });

    Promise.all([
      // Update existing vehicle
      ctx
        .db("vehicle")
        .update({
          outfit_level: outfitLevel && outfitLevel !== 0 ? outfitLevel : null,
          ...convertKeysToSnakeCase(restVehicle),
        })
        .where({ id: ctx.user.id }),
      // Delete old mods
      oldMods.forEach(async (mod: any) =>
        ctx
          .db("vehicle_mods")
          .where({ value: mod, node_id: vehicleId })
          .delete(),
      ),
      // Add new mods
      newMods.forEach(async (mod: any) =>
        ctx.db("vehicle_mods").insert({
          node_id: vehicleId,
          position: 1000,
          value: mod,
        }),
      ),
    ]);

    return { message: "Your vehicle has been updated" };
  },
};

export default accounts;
