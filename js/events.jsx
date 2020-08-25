import { Fragment, render, h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import * as jsjoda from "@js-joda/core";
import "regenerator-runtime/runtime";
import EventCard from "./events/EventCard";
const { ZonedDateTime, LocalDate, LocalTime, ZoneId } = jsjoda;

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
  const [timeZone, setTimeZone] = useState(zoneList[0]);
  const [startTime, setStartTime] = useState(timeList[0]);
  const [eventList, setEventList] = useState([]);
  const scrollContainer = useRef(null);
  const scrollSpy = useRef([]);

  useEffect(() => {
    const Run = async () => {
      const result = await fetch("/events/events.json");
      setEventList(
        Object.values(await result.json())
          .map((event) => ({
            ...event,
            date: {
              start: ZonedDateTime.parse(event.date.start),
              end: ZonedDateTime.parse(event.date.end),
            },
          }))
          .sort((a, b) => a.date.start.compareTo(b.date.start))
      );
    };
    Run();
  }, []);

  useEffect(() => {
    const time = LocalDate.parse("2019-11-16")
      .atTime(LocalTime.parse(startTime))
      .atZone(ZoneId.of(timeZone));

    console.log(time.withZoneSameInstant(ZoneId.UTC).toString());

    let i;
    for(i = 0; i < eventList.length; i++) {
      console.log("Testing", eventList[i].date.start.withZoneSameInstant(ZoneId.UTC).toString());
      if(eventList[i].date.start.isEqual(time)) {
        break;
      }
    }

    console.log("Earliest event is", eventList[i]);
    scrollContainer.current.scrollTo({ left: scrollSpy.current[i]?.base.offsetLeft, behavior: "smooth" });

    }, [timeZone, startTime, eventList]);

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
          {eventList.map((e, i) => (
            <EventCard event={e} ref={(ref) => (scrollSpy.current[i] = ref)} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

render(<Events />, document.querySelector("#events"));
