import { addDays, getDay } from "date-fns";
import { Month } from "../types/server";

const getSecondMondayInMonth = (month: Month, date: Date) => {
  const tempDate = date;
  tempDate.setDate(1);
  tempDate.setMonth(month);

  switch (getDay(tempDate)) {
    case 0: // sun
      return addDays(tempDate, 8);
    case 1: // mon
      return addDays(tempDate, 7);
    case 2: // tues
      return addDays(tempDate, 13);
    case 3: // weds
      return addDays(tempDate, 12);
    case 4: // thurs
      return addDays(tempDate, 11);
    case 5: // fri
      return addDays(tempDate, 10);
    case 6: // sat
    default:
      return addDays(tempDate, 9);
  }
};

export default getSecondMondayInMonth;
