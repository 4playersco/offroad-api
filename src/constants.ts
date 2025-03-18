export const emailGroups = [
  "officers",
  "runmaster",
  "webmaster",
  "run_leaders",
  "full_membership", // Membership announcement, membership newsletter
  "all_active", // Events, general announcements
  "guests",
  "all_users", // EVERYONE EVER
];

export const timezoneOffsetInMs = 25200000;
export const defaultPaginationSize = 20;
export const guestMaxRuns = 3;

export const yearInMs = 1000 * 60 * 60 * 24 * 365; // 1 year
export const monthInMs = 1000 * 60 * 60 * 24 * 30;
export const resetTokenTimeoutInMs = 3600000 * 24; // 1 hour x 24

export const datePrintFormat = "M/D/YYYY h:mma";
export const timezone = "America/Denver";
export const meetingLocation =
  "Charlie's Denver, 900 E Colfax Ave, Denver, CO 80218";
export const meetingStartTime = "19:00"; // 7pm
export const meetingEndTime = "20:30"; // 8:30pm

export const HASH_SECRET = process.env.HASH_SECRET ?? "";
export const AUTH_SECRET = process.env.AUTH_SECRET ?? "";

/**
 * Check Logged-in
 * Check Role
 * Check Account Status
 */
