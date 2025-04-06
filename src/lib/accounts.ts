import { User } from "@/generated/graphql";
import type { ContextUser } from "@/types/server";

export const hasRole = function hasRole(
  user: Pick<ContextUser, "role">,
  rolesNeeded: string[],
  shouldThrow = true,
) {
  const matchedRoles = rolesNeeded.includes(user.role);

  if (!matchedRoles && shouldThrow) {
    throw new Error(`You do not have the necessary role
      : ${rolesNeeded}
      You Have
      : ${user.role}
    `);
  }

  return matchedRoles;
};

export const hasAccountStatus = function hasAccountStatus(
  user: Pick<ContextUser, "accountStatus">,
  statusNeeded: string[],
  shouldThrow = true,
) {
  const matchedStatus = statusNeeded.includes(user.accountStatus);

  if (!matchedStatus && shouldThrow) {
    throw new Error(`You do not have the necessary account status
      : ${statusNeeded}
      You Have
      : ${user.accountStatus}
    `);
  }

  return matchedStatus;
};

export const hasAccountType = function hasAccountType(
  user: Pick<ContextUser, "accountType">,
  typeNeeded: string[],
  shouldThrow = true,
) {
  const matchedType = typeNeeded.includes(user.accountType);

  if (!matchedType && shouldThrow) {
    throw new Error(`You do not have the necessary account type
      : ${typeNeeded}
      You Have
      : ${user.accountType}
    `);
  }

  return matchedType;
};

export const hasRoleOrIsSelf = function hasRoleOrIsSelf(
  currentUser: User,
  rolesNeeded: string[],
  idInQuestion: string,
  shouldThrow = true,
) {
  const result =
    hasRole(currentUser, rolesNeeded, false) ||
    isSelf(currentUser, idInQuestion, false);

  if (!result && shouldThrow) {
    throw new Error("You must be an admin to do this");
  }
};

export const isSelf = function isSelf(
  currentUser: ContextUser,
  idInQuestion: string,
  shouldThrow = true,
) {
  const result = currentUser.id === idInQuestion;

  // console.log("current user id", currentUser.id);

  if (!result && shouldThrow) {
    throw new Error("You can only update your own information");
  }

  return result;
};
