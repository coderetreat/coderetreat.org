import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
import { h, Fragment, render } from "preact";
import { useEffect, useMemo, useState, useRef } from "preact/hooks";
import "regenerator-runtime/runtime";
import { Typeahead } from "react-bootstrap-typeahead";
import EventCard from "./events/EventCard";
import classNames from "classnames";
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

const useScrollSpy = (onScrollChange) => {
  const container = useRef();

  useEffect(() => {
    container.current.addEventListener("scroll", () =>
      onScrollChange(container.current)
    );
    window.addEventListener("resize", () => onScrollChange(container.current));
    onScrollChange(container.current);
  }, [container]);

  return container;
};

const DayOfEventContainer = ({ events, startTime, timeZoneId }) => {
  const [shouldShowScrollHintLeft, setShouldShowScrollHintLeft] = useState(
    false
  );
  const [shouldShowScrollHintRight, setShouldShowScrollHintRight] = useState(
    false
  );

  const ref = useScrollSpy((elem) => {
    const hasScrollBar = elem.scrollWidth !== elem.clientWidth;
    const isAllLeft = elem.scrollLeft === 0;
    const isAllRight = elem.scrollLeft + elem.clientWidth == elem.scrollWidth;

    if (!hasScrollBar) {
      setShouldShowScrollHintLeft(false);
      setShouldShowScrollHintRight(false);
    } else {
      setShouldShowScrollHintLeft(!isAllLeft);
      setShouldShowScrollHintRight(!isAllRight);
    }
  });

  return (
    <div class="day-of-event-container">
      <h2 class="day-of-event">
        {DAYS_OF_WEEK[ZonedDateTime.parse(startTime).dayOfWeek().ordinal()]}
      </h2>
      <div class="scroll-outer">
        {shouldShowScrollHintLeft && (
          <div class="scroll-hint scroll-hint-left"></div>
        )}
        <div class={classNames("mb-5", "scroll-container")} ref={ref}>
          <div class="mr-5">
            {events.map((e) => (
              <EventCard usersTimezone={timeZoneId} event={e} />
            ))}
          </div>
        </div>
        {shouldShowScrollHintRight && (
          <div class="scroll-hint scroll-hint-right"></div>
        )}
      </div>
    </div>
  );
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
              <Typeahead
                defaultInputValue={timeZone}
                style={{ maxWidth: "95%", display: "inline-block" }}
                onChange={(values) => setTimeZone(values[0])}
                options={jsjoda.ZoneId.getAvailableZoneIds()}
              />
            </div>
          </p>
          {Object.keys(eventsByLocalDay).map((startTime) => (
            <DayOfEventContainer
              timeZoneId={timeZoneId}
              events={eventsByLocalDay[startTime]}
              startTime={startTime}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

render(<Events />, document.querySelector("#events"));
