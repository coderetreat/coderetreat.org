import { Fragment, render, h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import * as jsjoda from "@js-joda/core";
import "regenerator-runtime/runtime";
import EventCard from "./events/EventCard";
const {
  ZonedDateTime,
  ZoneId,
  ZoneOffset,
  convert,
} = jsjoda;

const DAY_OF_EVENT_NEEDS_TO_CHANGE = "2019-11-16";

const Events = () => {
  const [timeZone, setTimeZone] = useState(
    ZoneId.ofOffset(
      "UTC",
      ZoneOffset.ofTotalMinutes(new Date(DAY_OF_EVENT_NEEDS_TO_CHANGE).getTimezoneOffset() * -1)
    ).id()
  );
  const [eventsByStartTime, setEventsByStartTime] = useState({});

  useEffect(() => {
    const Run = async () => {
      const result = await fetch("/events/events.json");
      const allEvents = Object.values(await result.json())
        .map((event) => ({
          ...event,
          date: {
            start: ZonedDateTime.parse(event.date.start),
            end: ZonedDateTime.parse(event.date.end),
          },
        }))
        .sort((a, b) => a.date.start.compareTo(b.date.start));

      const byStartTime = allEvents.reduce((grouped, event) => {
        const startTimeInUtc = event.date.start
          .withZoneSameInstant(ZoneId.UTC)
          .toString();
        return {
          ...grouped,
          [startTimeInUtc]: [...(grouped[startTimeInUtc] || []), event],
        };
      }, {});
      setEventsByStartTime(byStartTime);
    };
    Run();
  }, []);

  return (
    <Fragment>
      <div class="bg-light text-dark py-5">
        <div class = "container"
          style={{ overflowX: "scroll", whiteSpace: "nowrap" }}
        >
          <h1><b>Events Timeline</b></h1>

          {Object.keys(eventsByStartTime).map((startTime) => (
            <div
              class="mr-5"
            >
              <h3 class="mr-4"> Starting at&nbsp;
                {convert(
                  ZonedDateTime.parse(startTime)
                )
                  .toDate()
                  .toUTCString()}
              </h3>
              {eventsByStartTime[startTime].map((e) => (
                <EventCard usersTimezone={ZoneId.of(timeZone)} event={e} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

render(<Events />, document.querySelector("#events"));
