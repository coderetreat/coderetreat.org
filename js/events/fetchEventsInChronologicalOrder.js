import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
const { ZonedDateTime } = jsjoda;

export default async function fetchEventsInChronologicalOrder() {
  const result = await fetch("/events/events.json");
  return Object.entries(await result.json())
    .map(([id, event]) => ({
      id,
      ...event,
      date: {
        start: ZonedDateTime.parse(event.date.start),
        end: ZonedDateTime.parse(event.date.end),
      },
    }))
    .sort((a, b) => a.date.start.compareTo(b.date.start));
}
