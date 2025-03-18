import { officeChanged } from "./membership-log";

type Log = ReturnType<typeof officeChanged>;

const determineOfficeChanges = (
  existingOffice: string | null,
  newOffice: string | null,
  userId: string,
  loggerId: string,
  shouldThrow = false
): [string, string, Log[]] => {
  const toRemove = existingOffice === null ? "" : existingOffice;
  const toAdd = newOffice === null ? "" : newOffice;

  if (!toRemove && !toAdd && shouldThrow) {
    throw new Error("No office to change");
  }

  if (toRemove !== "" && toRemove === toAdd && shouldThrow) {
    throw new Error("Cannot change office to the same office");
  }

  const toLog: Log[] = [];

  if (toRemove && toRemove !== toAdd) {
    toLog.push(
      officeChanged({
        officeName: toRemove,
        loggerId,
        userId,
        add: false,
      })
    );
  }

  if (toAdd && toRemove !== toAdd) {
    toLog.push(
      officeChanged({
        officeName: toAdd,
        loggerId,
        userId,
        add: true,
      })
    );
  }

  return [toRemove, toAdd, toLog];
};

export default determineOfficeChanges;
