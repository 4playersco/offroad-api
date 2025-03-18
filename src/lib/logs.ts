import { MembershipMessageCode } from "@/types/main";
import { ContextUser } from "@/server/types";

export const accountCreated = () => ({
  message: "Account created",
});

export const accountUnlocked = (logger: string) => ({
  message: `Account unlocked by ${logger}`,
});

export const accountChanged = (afterState: string, logger: ContextUser) => {
  // logger
  //   ? `${property} changed from "${beforeState}" to "${afterState}" by ${logger}`
  //   : `${property} automatically changed from "${beforeState}" to "${afterState}"`,
  return {
    time: new Date(),
    message: `Account type changed to "${afterState}" by ${logger.firstName} ${logger.lastName}`,
    messageCode: MembershipMessageCode.ACCOUNT_CHANGED,
    logger: {
      connect: {
        id: logger.id,
      },
    },
  };
};

export const accountRejected = (logger: string, reason: string) =>
  `Account rejected by ${logger}: ${reason}`;

export const duesPaid = (logger: string) =>
  logger ? `Dues received by ${logger}` : `Dues received via website`;

export const officeAdded = (office: string, logger: string) =>
  `"${office}" office added by ${logger}`;

export const officeRemoved = (office: string, logger: string) =>
  `"${office}" office removed by ${logger}`;

export const titleAdded = (title: string, logger: string) =>
  `"${title}" title added by ${logger}`;

export const titleRemoved = (title: string, logger: string) =>
  `"${title}" title removed by ${logger}`;

export const membershipEligible = () => "Eligible for membership";

export const guestRestricted = () => "Attended 3 runs";
