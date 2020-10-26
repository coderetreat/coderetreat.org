import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
import { h, Fragment, render } from "preact";
import { useEffect, useMemo, useState, useRef } from "preact/hooks";
import "regenerator-runtime/runtime";
import { Typeahead } from "react-bootstrap-typeahead";
import EventCard from "./events/EventCard";
import classNames from "classnames";
import "react-bootstrap-typeahead/css/Typeahead.css";
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

const ScrollContainer = ({ children }) => {
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
    <div class="scroll-outer">
      {shouldShowScrollHintLeft && (
        <div class="scroll-hint scroll-hint-left"></div>
      )}
      <div class="scroll-container" ref={ref}>
        {children}
      </div>
      {shouldShowScrollHintRight && (
        <div class="scroll-hint scroll-hint-right"></div>
      )}
    </div>
  );
};

const TIME_FORMAT = jsjoda.DateTimeFormatter.ofPattern("HH:mm");
const DayOfEventContainer = ({ events, startTime, timeZoneId }) => {
  const eventsByStartDay = {};
  for (let event of events) {
    const startTime = event.date.start
      .withZoneSameInstant(timeZoneId)
      .format(TIME_FORMAT);
    eventsByStartDay[startTime] = [
      ...(eventsByStartDay[startTime] || []),
      event,
    ];
  }

  return (
    <div class="day-of-event-container">
      <h2 class="day-of-event">
        {DAYS_OF_WEEK[ZonedDateTime.parse(startTime).dayOfWeek().ordinal()]}
      </h2>
      {Object.keys(eventsByStartDay)
        .sort()
        .map((time) => (
          <Fragment>
            <h3 class="ml-md-3">Starting at {time}</h3>

            <ScrollContainer>
              <div class="mb-5 mr-md-5">
                {eventsByStartDay[time].map((e) => (
                  <EventCard usersTimezone={timeZoneId} event={e} />
                ))}
              </div>
            </ScrollContainer>
          </Fragment>
        ))}
    </div>
  );
};

const Timeline = ({ events, timeZone }) => {
  if (!events.length) return <svg></svg>;

  const max = events.reduce(
    (max, { date: { start, end } }) =>
      end.isAfter(max) ? end : start.isAfter(max) ? start : max,
    jsjoda.ZonedDateTime.of8(2000, 1, 1, 1, 1, 1, 1, ZoneId.of("UTC"))
  );

  const min = events.reduce(
    (min, { date: { start, end } }) =>
      start.isBefore(min) ? start : end.isBefore(min) ? end : min,
    jsjoda.ZonedDateTime.of8(2030, 1, 1, 1, 1, 1, 1, ZoneId.of("UTC"))
  );

  const from = jsjoda.ZonedDateTime.of8(
    2020,
    11,
    6,
    0,
    0,
    0,
    0,
    ZoneId.of("UTC+12")
  ).withZoneSameInstant(ZoneId.of(timeZone));
  const to = jsjoda.ZonedDateTime.of8(
    2020,
    11,
    8,
    0,
    0,
    0,
    0,
    ZoneId.of("UTC-12")
  ).withZoneSameInstant(ZoneId.of(timeZone));

  const duration = jsjoda.Duration.between(from, to).toHours();

  const rects = [];
  const dayLabels = [];
  const hourLabels = [];

  let hourStart = from;
  let maxCount = 0;

  let day = hourStart.dayOfWeek();
  for (let i = 0; i < duration; i++) {
    if (day != hourStart.dayOfWeek().ordinal()) {
      day = hourStart.dayOfWeek().ordinal();
      dayLabels.push({ i, day });
    }
    hourLabels.push({
      i,
      text: hourStart.format(jsjoda.DateTimeFormatter.ofPattern("HH:mm")),
    });

    const hourEnd = hourStart.plusHours(1);

    const eventsInThisHour = events.filter(
      ({ date: { start, end } }) =>
        start.isBefore(hourEnd) && end.isAfter(hourStart)
    );

    maxCount = Math.max(maxCount, eventsInThisHour.length);

    rects.push({ start: hourStart, count: eventsInThisHour.length });
    hourStart = hourStart.plusHours(1);
  }

  const GAP_SIZE = 5;
  return (
    <svg
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox={`-10 -30 ${duration * (10 + GAP_SIZE)} 70`}
      preserveAspectRatio="xMinYMin"
    >
      <g>
        {dayLabels.map(({ i, day }) => (
          <Fragment>
            <line
              x1={i * 10 + (i - 1) * GAP_SIZE - GAP_SIZE / 2}
              x2={i * 10 + (i - 1) * GAP_SIZE - GAP_SIZE / 2}
              stroke="grey"
              strokeDasharray="2"
              y1="-15"
              y2="60"
            />
            <text
              transform={`translate(${
                i * 10 + (i - 1) * GAP_SIZE
              }, -2) rotate(0) `}
              style={{
                fontSize: "1em",
                fontWeight: "lighter",
                textTransform: "uppercase",
              }}
            >
              {DAYS_OF_WEEK[day]}
            </text>
          </Fragment>
        ))}
        {hourLabels.map(({ i, text }) => (
          <text
            transform={`translate(${
              i * 10 + (i - 1) * GAP_SIZE + 3
            }, 20) rotate(90) `}
            textAnchor="start"
            style={{ fontSize: "0.5em" }}
          >
            {text}
          </text>
        ))}
        {rects.map(({ count }, i) => (
          <rect
            height="10"
            data-count={count}
            width="10"
            style={{
              outline: "1px solid rgba(27,31,35,.04)",
              outlineOffset: "-1px",
              fill: "#74BCCD",
              shapeRendering: "geometricPrecision",
              "fill-opacity": `${count / maxCount}`,
            }}
            transform={`translate(${i * 10 + (i - 1) * GAP_SIZE}, 5)`}
          />
        ))}
      </g>
    </svg>
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
        <div class="container-fluid p-3 pl-md-5 pr-md-0">
          <h1>
            <b>Timeline for #GDCR2020</b>
          </h1>
          <p class="lead">
            All times shown are in the timezone for{" "}
            <div class="form-inline d-inline">
              <Typeahead
                defaultInputValue={timeZone}
                style={{ maxWidth: "95%", display: "inline-block" }}
                onChange={(values) => {
                  if (!values.length) return;
                  setTimeZone(values[0]);
                }}
                options={jsjoda.ZoneId.getAvailableZoneIds()}
              />
            </div>
          </p>
          <div class="my-5 pr-5 d-md-block d-none">
            <Timeline
              events={Object.values(eventsByLocalDay).flat()}
              timeZone={timeZone}
            />
          </div>
          {Object.keys(eventsByLocalDay).map((startTime, i) => (
            <Fragment>
              <DayOfEventContainer
                timeZoneId={timeZoneId}
                events={eventsByLocalDay[startTime]}
                startTime={startTime}
              />
              <hr class="px-5 mr-5"/>
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

render(<Events />, document.querySelector("#events"));
