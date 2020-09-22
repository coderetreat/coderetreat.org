import { Fragment, render, h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import * as jsjoda from "@js-joda/core";
import "regenerator-runtime/runtime";
import EventCard from "./events/EventCard";
const { ZonedDateTime, ZoneId, ZoneOffset, convert } = jsjoda;

const DAY_OF_EVENT_NEEDS_TO_CHANGE = "2019-11-16";

const Events = () => {
  const [timeZone, setTimeZone] = useState(
    ZoneId.ofOffset(
      "UTC",
      ZoneOffset.ofTotalMinutes(
        new Date(DAY_OF_EVENT_NEEDS_TO_CHANGE).getTimezoneOffset() * -1
      )
    ).id()
  );
  const [eventsByStartTime, setEventsByStartTime] = useState({});

  useEffect(() => {
    const Run = async () => {
      const result = await fetch("/events/events.json");
      const allEvents = Object.entries(await result.json())
        .map(([id, event]) => ({
          id,
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
        <div class="container">
          <h1>
            <b>Timeline for #GDCR2020</b>
          </h1>
          {Object.keys(eventsByStartTime).map((startTime) => (
            <Fragment>
              <h2 class="">
                <u>
                  Events starting at&nbsp;
                  {convert(ZonedDateTime.parse(startTime))
                    .toDate()
                    .toUTCString()}
                  :{" "}
                </u>
              </h2>
              <div
                style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                class="mb-5"
              >
                <div class="mr-5">
                  {eventsByStartTime[startTime].map((e) => (
                    <EventCard usersTimezone={ZoneId.of(timeZone)} event={e} />
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

render(<Events />, document.querySelector("#events"));
