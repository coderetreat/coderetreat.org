import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
import { h, Fragment, render } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import "regenerator-runtime/runtime";
import EventCard from "./events/EventCard";
const { ZonedDateTime, ZoneId, ChronoUnit, ChronoField, convert } = jsjoda;

const DAY_OF_EVENT_NEEDS_TO_CHANGE = "2019-11-16";

const DAYS_OF_WEEK = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday",
};

const Events = () => {
  const [timeZone, setTimeZone] = useState(ZoneId.systemDefault().id());
  const [events, setEvents] = useState([]);

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

      setEvents(allEvents);
    };
    Run();
  }, []);

  const eventsByLocalDay = useMemo(
    () =>
      events.reduce((grouped, event) => {
        const startTime = event.date.start
          .withZoneSameInstant(ZoneId.of(timeZone))
          .truncatedTo(ChronoUnit.DAYS)
          .toString();
        return {
          ...grouped,
          [startTime]: [...(grouped[startTime] || []), event],
        };
      }, {}),
    [events, timeZone]
  );

  const timeZoneId = useMemo(() => ZoneId.of(timeZone), [timeZone]);

  return (
    <Fragment>
      <div class="bg-light text-dark py-5">
        <div class="container">
          <h1>
            <b>Timeline for #GDCR2020</b>
          </h1>
          <p class="lead">
            All times shown are in the timezone for{" "}
            <div class="form-inline d-inline">
              <select
                class="form-control"
                style={{ maxWidth: "95%" }}
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
              >
                {ZoneId.getAvailableZoneIds().sort().map((zone) => (
                  <option value={zone}>{zone}</option>
                ))}
              </select>
            </div>
          </p>
          {Object.keys(eventsByLocalDay).map((startTime) => (
            <div class="day-of-event-container">
              <h2 class="day-of-event">
                {console.log(ZonedDateTime.parse(startTime).dayOfWeek())}
                {
                  DAYS_OF_WEEK[
                    ZonedDateTime.parse(startTime).dayOfWeek().ordinal()
                  ]
                }
              </h2>
              <div
                style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                class="mb-5"
              >
                <div class="mr-5">
                  {eventsByLocalDay[startTime].map((e) => (
                    <EventCard usersTimezone={timeZoneId} event={e} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

render(<Events />, document.querySelector("#events"));
