import { Request, Response } from "express";
import { startOfDay, endOfYear, startOfYear } from "date-fns";
import ical, { ICalCalendar } from "ical-generator";

import { formatError } from "@/lib";

import db from "@/db/client";
import type { ResponseBody, ResponseError } from "@/types/main";

const MIN_DAYS = 1;
const MAX_DAYS = 10;

export const getUpcoming = async (
  req: Request,
  res: Response<ResponseBody<Event[]> | ResponseError>,
) => {
  // allow from public site, override global cors settings
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://4-playersofcolorado.org",
  );
  const { count } = req.query;
  const numberCount = Number(count);

  try {
    // @ts-ignore
    const events = await db.query.events(
      {
        where: {
          AND: [
            { startTime_gte: startOfDay(new Date()).toISOString() },
            { endTime_lt: endOfYear(new Date()).toISOString() },
          ],
        },
        orderBy: "startTime_ASC",
        first:
          numberCount >= MIN_DAYS && numberCount < MAX_DAYS
            ? numberCount
            : MAX_DAYS,
      },
      "{ id title startTime trailDifficulty }",
    );

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: [formatError(error)] });
  }
};

export const getIcal = async (
  req: Request,
  res: Response<ICalCalendar | ResponseError>,
) => {
  // allow from all origins, override global cors settings
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    // @ts-ignore
    const events = await db.query.events(
      {
        where: {
          startTime_gte: startOfYear(new Date()).toISOString(),
        },
        orderBy: "startTime_ASC",
      },
      "{ id createdAt updatedAt title type startTime endTime trailDifficulty }",
    );

    const filename = "calendar.ics";

    const calendar = ical({
      name: "4-Players",
      ttl: 3600,
      events: events.forEach((event: any) => {
        const url = `https://members.4-playersofcolorado.org/event/${event.id}`;

        return {
          id: event.id,
          uid: event.id,
          created: new Date(event.createdAt),
          lastModified: new Date(event.updatedAt),
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          summary: event.title,
          categories: [{ name: event.type }],
          description: url,
          url,
        };
      }),
    });

    // return calendar.serve(res);
    return new Response(calendar.toString(), {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename='${filename}'`,
      },
      status: 200,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send({ error: [formatError(error)] });
  }
};
