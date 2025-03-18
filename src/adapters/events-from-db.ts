import { RawEventDetails } from "../types/data";
import { EventDetails } from "../types/main";

const eventsFromDb = (
  dbEvents: RawEventDetails[] | undefined,
): EventDetails[] | undefined => {
  return dbEvents
    ? dbEvents.map((dbEvent) => ({
        id: dbEvent.id,
        title: dbEvent.title,
        type: dbEvent.type,
        startTime: dbEvent.start_time,
        endTime: dbEvent.end_time,
        rallyAddress: dbEvent.rally_address,
      }))
    : undefined;
};

export default eventsFromDb;
