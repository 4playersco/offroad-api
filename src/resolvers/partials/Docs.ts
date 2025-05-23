import { hasAccountStatus } from "@/lib";
import { getSingleFile, getAllFiles, formatArchives } from "@/lib/docs-bucket";
import { AccountStatus } from "@/types/enums";

const BYLAWS_PREFIX = "bylaws/";
const SORS_PREFIX = "sors/";
const MEETING_MINUTES_PREFIX = "meeting-minutes/";
const NEWSLETTERS_PREFIX = "newsletters/";

// const uploadNewBylaws = () => {
//   // Receive new file from UI
//   // List directory
//   // Move existing file to /archive
//   // Upload new file to b2
// };
// const uploadNewSors = () => {};
// const uploadNewMeetingMinutes = () => {};
// const uploadNewNewsletter = () => {};

// const getAllMeetingMinutes = () => {};
// const getAllNewsletters = () => {};

const docs = {
  mutations: {},
  queries: {
    async getDocs(parent: unknown, args: any, ctx: ExtraContext) {
      // Logged in?
      if (!ctx.user?.id) {
        throw new Error("User must be logged in");
      }

      // Requesting user has proper account status?
      if (
        !hasAccountStatus(
          ctx.user,
          [AccountStatus.ACTIVE, AccountStatus.PAST_DUE],
          false,
        )
      ) {
        throw new Error(
          `Account status must be ACTIVE or PAST_DUE to proceed. Contact the board to request reinstatement`,
        );
      }

      try {
        const [bylaws, sors, meetingMinutes, newsletters] = await Promise.all([
          getSingleFile(BYLAWS_PREFIX),
          getSingleFile(SORS_PREFIX),
          getAllFiles(MEETING_MINUTES_PREFIX),
          getAllFiles(NEWSLETTERS_PREFIX),
        ]);

        return {
          bylaws,
          sors,
          archives: formatArchives(meetingMinutes, newsletters),
        };
      } catch (e) {
        console.error(e);
        throw new Error("Issue with docs service. Contact the webmaster.");
      }
    },
  },
};

export default docs;
