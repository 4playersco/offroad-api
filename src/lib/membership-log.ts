import { MembershipMessageCode, AccountStatus } from "@/types/enums";
import { type ContextUser } from "@/types/server";
import cuid from "@bugsnag/cuid";
//   GUEST_RESTRICTED           AUTO/TRANSACTIONAL

interface Log {
  id: string;
  time: Date;
  message: string;
  user: string;
  logger?: string;
}

interface MembershipLog extends Log {
  message_code: MembershipMessageCode;
}

interface ActivityLog extends Log {
  message_code: ActivityLog;
}

type CombinedLog = (MembershipLog | ActivityLog)[];

export const duesPaid = (
  amt: string,
  user: string,
  logger?: ContextUser,
  payerName?: string,
): MembershipLog => {
  const wasLoggedByAdmin = !!logger;
  const didPayForAnother = !!payerName;
  const id = cuid();

  if (didPayForAnother) {
    // paid by...
    return {
      id,
      time: new Date(),
      message: `$${amt} paid for by ${payerName} via website`,
      message_code: MembershipMessageCode.DUES_PAID,
      user,
    };
  }

  if (wasLoggedByAdmin) {
    return {
      id,
      time: new Date(),
      message: `Paid $${amt}`,
      message_code: MembershipMessageCode.DUES_PAID,
      logger: logger.id,
      user,
    };
  }

  return {
    id,
    time: new Date(),
    message: `Paid $${amt} via website`,
    message_code: MembershipMessageCode.DUES_PAID,
    user,
  };
};

export const accountCreated = (userId: string) => ({
  id: cuid(),
  time: new Date(),
  message: "Account created",
  user: userId,
  message_code: MembershipMessageCode.ACCOUNT_CREATED,
});

export const accountUnlocked = (loggerId: string, userId: string) => ({
  id: cuid(),
  time: new Date(),
  message: "Account unlocked",
  message_code: MembershipMessageCode.ACCOUNT_UNLOCKED,
  logger: loggerId,
  user: userId,
});

export const accountRejected = (
  loggerId: string,
  userId: string,
  note: string,
) => ({
  id: cuid(),
  time: new Date(),
  message: `Account rejected: ${note}`,
  message_code: MembershipMessageCode.ACCOUNT_REJECTED,
  logger: loggerId,
  user: userId,
});

type AccountChangedParams = {
  stateName: string;
  newState: AccountStatus;
  userId: string;
  loggerId?: string;
};

type ChangedParams = {
  officeName?: string;
  titleName?: string;
  add?: boolean;
  userId: string;
  loggerId: string;
};

export const accountChanged = ({
  stateName,
  newState,
  userId,
  loggerId,
}: AccountChangedParams) => ({
  id: cuid(),
  time: new Date(),
  message: `${stateName} changed to "${newState}"`,
  message_code: MembershipMessageCode.ACCOUNT_CHANGED,
  user: userId,
  ...(loggerId
    ? {
        logger: loggerId,
      }
    : {}),
});

export const officeChanged = ({
  officeName,
  userId,
  loggerId,
  add = true,
}: ChangedParams) => {
  const defaultLog = {
    id: cuid(),
    time: new Date(),
    logger: loggerId,
    user: userId,
  };

  return {
    message: `${officeName} office ${add ? "added" : "removed"}`,
    message_code: add
      ? MembershipMessageCode.OFFICE_ADDED
      : MembershipMessageCode.OFFICE_REMOVED,
    ...defaultLog,
  };
};

export const titleChanged = ({
  titleName,
  userId,
  loggerId,
  add = true,
}: ChangedParams) => {
  const defaultLog = {
    id: cuid(),
    time: new Date(),
    logger: loggerId,
    user: userId,
  };

  return {
    message: `${titleName} title ${add ? "added" : "removed"}`,
    message_code: add
      ? MembershipMessageCode.TITLE_ADDED
      : MembershipMessageCode.TITLE_REMOVED,
    ...defaultLog,
  };
};

// export const membershipUnlocked = (userId: string) => ({
//   time: new Date(),
//   message: `${stateName} changed to "${newState}"`,
//   message_code: MembershipMessageCode.MEMBERSHIP_GRANTED,
//   ...(userId
//     ? {
//         logger: {
//           connect: {
//             id: userId,
//           },
//         },
//       }
//     : {}),
// });
