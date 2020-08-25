import { Fragment, render, h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import * as jsjoda from "@js-joda/core";
import "regenerator-runtime/runtime";
import EventCard from "./events/EventCard";
const {
  ZonedDateTime,
  LocalDate,
  LocalTime,
  ZoneId,
  ZoneOffset,
  convert,
} = jsjoda;

const DAY_OF_EVENT_NEEDS_TO_CHANGE = "2019-11-16";

const Events = () => {
  const zoneList = [
    "UTC-12:00",
    "UTC-11:00",
    "UTC-10:00",
    "UTC-09:30",
    "UTC-09:00",
    "UTC-08:00",
    "UTC-07:00",
    "UTC-06:00",
    "UTC-05:00",
    "UTC-04:00",
    "UTC-03:30",
    "UTC-03:00",
    "UTC-02:00",
    "UTC-01:00",
    "UTC+00:00",
    "UTC+01:00",
    "UTC+02:00",
    "UTC+03:00",
    "UTC+03:30",
    "UTC+04:00",
    "UTC+04:30",
    "UTC+05:00",
    "UTC+05:30",
    "UTC+05:45",
    "UTC+06:00",
    "UTC+06:30",
    "UTC+07:00",
    "UTC+08:00",
    "UTC+08:45",
    "UTC+09:00",
    "UTC+09:30",
    "UTC+10:00",
    "UTC+10:30",
    "UTC+11:00",
    "UTC+12:00",
    "UTC+12:45",
    "UTC+13:00",
    "UTC+14:00",
  ];
  const timeList = ["09:00"];
  const [timeZone, setTimeZone] = useState(
    ZoneId.ofOffset(
      "UTC",
      ZoneOffset.ofTotalMinutes(new Date(DAY_OF_EVENT_NEEDS_TO_CHANGE).getTimezoneOffset() * -1)
    ).id()
  );
  const [startTime, setStartTime] = useState(timeList[0]);
  const [eventsByStartTime, setEventsByStartTime] = useState({});
  const scrollContainer = useRef(null);
  const scrollSpy = useRef([]);

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

  useEffect(() => {
    const time = LocalDate.parse(DAY_OF_EVENT_NEEDS_TO_CHANGE)
      .atTime(LocalTime.parse(startTime))
      .atZone(ZoneId.of(timeZone));

    console.log(time.withZoneSameInstant(ZoneId.UTC).toString());

    let i;
    const startTimes = Object.keys(eventsByStartTime);
    for (i = 0; i < startTimes.length; i++) {
      const eventStartTime = ZonedDateTime.parse(
        startTimes[i]
      ).withZoneSameInstant(ZoneId.UTC);

      console.log("Testing", eventStartTime);
      if (eventStartTime.isAfter(time) || eventStartTime.isEqual(time)) {
        break;
      }
    }

    scrollContainer.current.scrollTo({
      left: scrollSpy.current[startTimes[i]]?.offsetLeft,
      behavior: "smooth",
    });
  }, [timeZone, startTime, eventsByStartTime]);

  return (
    <Fragment>
      <div class="jumbotron jumbotron-fluid m-0 p-0">
        <div class="container" style={{ lineHeight: "200%" }}>
          <h1 style='line-height: 1.5;font-size: 3rem;font-weight: 900;font-family: "Arial Black", Helvetica;'>
            My timezone is{" "}
            <select onChange={(e) => setTimeZone(e.target.value)}>
              {zoneList.map((z) => (
                <option value={z} selected={z === timeZone}>
                  {z}
                </option>
              ))}
            </select>
            . <br />I want to attend an event that starts at{" "}
            <select onChange={(e) => setStartTime(e.target.value)}>
              {timeList.map((z) => (
                <option value={z}>{z}</option>
              ))}
            </select>
          </h1>
          <button>9 virtual events found</button>
          <button>10 on-site events found</button>
        </div>
      </div>
      <div class="bg-light text-dark py-5">
        <div
          ref={scrollContainer}
          style={{ overflowX: "scroll", whiteSpace: "nowrap" }}
        >
          {Object.keys(eventsByStartTime).map((startTime) => (
            <div
              style={{ display: "inline-block" }}
              class="mx-5"
              ref={(ref) => (scrollSpy.current[startTime] = ref)}
            >
              <h1 class="mx-4">
                {convert(
                  ZonedDateTime.parse(startTime)
                    .withZoneSameInstant(ZoneId.of(timeZone))
                    .toLocalDateTime()
                )
                  .toDate()
                  .toLocaleString()}
              </h1>
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
