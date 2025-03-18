import { titleChanged } from "./membership-log";
import isEqual from "lodash/isEqual";

type Log = ReturnType<typeof titleChanged>;

const determineTitleChanges = (
  existingTitles: string[] | null,
  newTitles: string[] | null,
  loggerId: string,
  userId: string,
  shouldThrow = false
): [string[], string[], Log[]] => {
  const safeExistingTitles = existingTitles ? existingTitles : [];
  const safeNewTitles = newTitles ? newTitles : [];

  // oldList that aren't in newList
  const toRemove = safeExistingTitles.filter(
    (item: string) => !safeNewTitles.includes(item)
  );

  // newList that aren't in oldList
  const toAdd = safeNewTitles.filter(
    (item: string) => !safeExistingTitles.includes(item)
  );

  if (toRemove.length === 0 && toAdd.length === 0 && shouldThrow) {
    throw new Error("No titles to change");
  }

  if (toRemove.length > 0 && isEqual(toRemove, toAdd) && shouldThrow) {
    throw new Error("Cannot change titles to the same titles");
  }

  const toLog: Log[] = [
    ...toRemove.map((title: string) =>
      titleChanged({
        titleName: title,
        loggerId,
        userId,
        add: false,
      })
    ),
    ...toAdd.map((title: string) =>
      titleChanged({
        titleName: title,
        loggerId,
        userId,
        add: true,
      })
    ),
  ];

  return [toRemove, toAdd, toLog];
};

export default determineTitleChanges;
