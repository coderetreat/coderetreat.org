import { Fragment, render, h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import * as jsjoda from "@js-joda/core";
import "regenerator-runtime/runtime";
import EventCard from "./events/EventCard";
const { ZonedDateTime } = jsjoda;

const Events = () => {
  const zoneList = ["UTC−12:00","UTC−11:00","UTC−10:00","UTC−09:30","UTC−09:00","UTC−08:00","UTC−07:00","UTC−06:00","UTC−05:00","UTC−04:00","UTC−03:30","UTC−03:00","UTC−02:00","UTC−01:00","UTC±00:00","UTC+01:00","UTC+02:00","UTC+03:00","UTC+03:30","UTC+04:00","UTC+04:30","UTC+05:00","UTC+05:30","UTC+05:45","UTC+06:00","UTC+06:30","UTC+07:00","UTC+08:00","UTC+08:45","UTC+09:00","UTC+09:30","UTC+10:00","UTC+10:30","UTC+11:00","UTC+12:00","UTC+12:45","UTC+13:00","UTC+14:00"];
  const timeList = ["9:00am"];
  const [timeZone, setTimeZone] = useState(zoneList[0]);
  const [startTime, setStartTime] = useState([]);
  const [eventList, setEventList] = useState([]);
  const scrollSpy = useRef(null);

  useEffect(() => {
    const Run = async () => {
      const result = await fetch("/events/events.json");
      setEventList(Object.values(await result.json())
        .map(event => ({
          ...event,
          date: {
            start : ZonedDateTime.parse(event.date.start),
            end : ZonedDateTime.parse(event.date.end)
          }
        }))
        .sort((a,b) => b.date.start.compareTo(a.date.start)))
    };
    Run();
  }, []);

  return (
    <Fragment>
      <div class="jumbotron jumbotron-fluid m-0 p-0">
        <div class="container" style={{ lineHeight: "200%" }}>
          <h1 style='line-height: 1.5;font-size: 3rem;font-weight: 900;font-family: "Arial Black", Helvetica;'>
            My timezone is{" "}
            <select>
              {zoneList.map(z => <option>{z}</option>)}
            </select>
            . <br />I want to attend an event that starts at{" "}
            <select>
              {timeList.map(z => <option>{z}</option>)}
            </select>
          </h1>
          <button>9 virtual events found</button>
          <button>10 on-site events found</button>
        </div>
      </div>
      <div class="bg-light text-dark py-5">
        <div ref={scrollSpy} style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
          {eventList.map((e) => (
            <EventCard event={e} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

render(<Events />, document.querySelector("#events"));
