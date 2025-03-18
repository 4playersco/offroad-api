import type { NextApiRequest, NextApiResponse } from "next";
import { startOfDay } from "date-fns";

import { jan1, mar1, apr1, nightly } from "@/server/scheduled";
import { formatError } from "@/server/lib";

type Script = "jan1" | "mar1" | "apr1" | "nightly";
type Status = {
  success: boolean;
  error?: string;
};
type ScheduledResponse = Partial<Record<Script, Status>>[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScheduledResponse>
) {
  const date = startOfDay(new Date());
  const response: ScheduledResponse = [];
  let errors = false;

  if (date.getMonth() === 0 && date.getDate() === 1) {
    try {
      console.log("Running January 1 script");
      await jan1();
      console.log("January 1 script completed");
      response.push({ jan1: { success: true } });
    } catch (error) {
      response.push({ jan1: { success: false, error: formatError(error) } });
      errors = true;
    }
  }

  if (date.getMonth() === 2 && date.getDate() === 1) {
    try {
      console.log("Running March 1 script");
      await mar1();
      console.log("March 1 script completed");
      response.push({ mar1: { success: true } });
    } catch (error) {
      response.push({ mar1: { success: false, error: formatError(error) } });
      errors = true;
    }
  }

  if (date.getMonth() === 3 && date.getDate() === 1) {
    try {
      console.log("Running April 1 script");
      await apr1();
      console.log("April 1 script completed");
      response.push({ apr1: { success: true } });
    } catch (error) {
      response.push({ apr1: { success: false, error: formatError(error) } });
      errors = true;
    }
  }

  try {
    console.log("Running nightly script");
    await nightly();
    console.log("Nightly script completed");
    response.push({ nightly: { success: true } });
  } catch (error) {
    response.push({ nightly: { success: false, error: formatError(error) } });
    errors = true;
  }

  res.status(errors ? 500 : 200).json(response);
}
