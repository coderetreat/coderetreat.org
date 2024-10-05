import * as jsjoda from "@js-joda/core";
import { useEffect, useMemo, useState, Fragment, useRef } from "react";
import ReactDOM from "react-dom/client";
import "regenerator-runtime/runtime";
import jekyllConfigRaw from "../_config.yml?raw";
import { parse } from "yaml";
import EventCard from "./events/EventCard";
import fetchEventsInChronologicalOrder from "./events/fetchEventsInChronologicalOrder";
import InteractiveTimeZoneSelector from "./events/interactiveTimeZoneSelector";
import { LocalizedDate } from "./events/LocalizedDateTime";
import { Map } from "./map/Map";
import fetchCommunities from "./events/fetchCommunities";

const jekyllConfig = parse(jekyllConfigRaw);

const { ZoneId, Duration, ZonedDateTime, LocalDate, LocalTime } = jsjoda;

const earliestGDCRStart = LocalDate.parse(
  jekyllConfig.globalday.start
).atStartOfDay(ZoneId.of("UTC+14"));
const latestGDCREnd = LocalDate.parse(jekyllConfig.globalday.end)
  .atStartOfDay(ZoneId.of("UTC-12"))
  .plusDays(1)
  .minusSeconds(1);
const isCurrentDateAfterGDCR = ZonedDateTime.now().isAfter(latestGDCREnd);

const Events = () => {
  const [timeZone, setTimeZone] = useState(ZoneId.systemDefault().id());
  const timeZoneId = useMemo(() => ZoneId.of(timeZone), [timeZone]);
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [allEvents, setAllEvents] = useState([]);
  const [
    { allUpcomingEvents, eventsBeforeGDCR, eventsDuringGDCR, eventsAfterGDCR },
    setEvents,
  ] = useState({
    allUpcomingEvents: [],
    eventsBeforeGDCR: [],
    eventsDuringGDCR: [],
    eventsAfterGDCR: [],
  });

  const [allCommunities, setAllCommunties] = useState([]);
  
  useEffect(() => {
    const Run = async () => {
      const allFetchedEvents = await fetchEventsInChronologicalOrder();
      setAllEvents(allFetchedEvents);
    };
    Run();
  }, []);

  useEffect(() => {
    const Run = async () => {
      const allFetchedCommunities = await fetchCommunities();
      setAllCommunties(allFetchedCommunities);
    };
    Run();
  }, []);

  const eventRefs = useRef({});

  useEffect(() => {
    const upcomingEvents = allEvents
      .filter((event) => event.date.end.isAfter(ZonedDateTime.now()))
      .map((e, i) => ({ ...e, id: i }));

    let eventsFilteredByType = upcomingEvents;
    if (eventTypeFilter === "virtual") {
      eventsFilteredByType = eventsFilteredByType.filter(
        (event) => event.location === "virtual"
      );
    } else if (eventTypeFilter === "onsite") {
      eventsFilteredByType = eventsFilteredByType.filter(
        (event) => event.location !== "virtual"
      );
    }

    const eventsBeforeGDCR = eventsFilteredByType.filter((event) =>
      event.date.end.isBefore(earliestGDCRStart)
    );
    const eventsDuringGDCR = eventsFilteredByType.filter(
      (event) =>
        (event.date.end.isEqual(earliestGDCRStart) ||
          event.date.end.isAfter(earliestGDCRStart)) &&
        (event.date.start.isEqual(latestGDCREnd) ||
          event.date.start.isBefore(latestGDCREnd))
    );
    const eventsAfterGDCR = eventsFilteredByType.filter((event) =>
      event.date.start.isAfter(latestGDCREnd)
    );
    setEvents({
      allUpcomingEvents: upcomingEvents,
      eventsBeforeGDCR,
      eventsDuringGDCR,
      eventsAfterGDCR,
    });
  }, [allEvents, eventTypeFilter]);

  const scrollEventIntoView = (eventId) => {
    if (eventRefs.current[eventId]) {
      eventRefs.current[eventId].querySelector(".card").click();
      window.setTimeout(() => {
        eventRefs.current[eventId].scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 250);
    }
  };

  return (
    <div>
      <Map events={allUpcomingEvents} communities={allCommunities} onClickOnEvent={scrollEventIntoView} />
      <div className="container" style={{ minHeight: "max(60vh, 500px)" }}>
        <h1 className="display-1 my-5 ">Next Events</h1>
        <p className="lead">
          Coderetreats happen all over the world and throughout the whole year!
          Find an event and join your first coderetreat, or browse our{" "}
          <a href="/events/all">list of past coderetreats</a> to find
          facilitators for your own event.
        </p>
        <div>
          All times shown are in the timezone for{" "}
          <InteractiveTimeZoneSelector
            timeZone={timeZone}
            setTimeZone={setTimeZone}
          />
          <EventTypeSelection
            eventTypeFilter={eventTypeFilter}
            setEventTypeFilter={setEventTypeFilter}
          />
        </div>
        <EventList
          title="Events before Global Day of Coderetreat"
          events={eventsBeforeGDCR}
          timeZoneId={timeZoneId}
          eventRefs={eventRefs}
        />
        <EventList
          title={
            <>
              Global Day of Coderetreat events (
              <LocalizedDate
                date={earliestGDCRStart}
                timeZone={timeZoneId}
              /> - <LocalizedDate date={latestGDCREnd} timeZone={timeZoneId} />)
            </>
          }
          events={eventsDuringGDCR}
          timeZoneId={timeZoneId}
          promoteMultidayEventsOnTop={true}
          eventRefs={eventRefs}
        />
        <EventList
          title={
            isCurrentDateAfterGDCR
              ? "Upcoming events"
              : "Events after Global Day of Coderetreat"
          }
          events={eventsAfterGDCR}
          timeZoneId={timeZoneId}
          eventRefs={eventRefs}
        />
      </div>
    </div>
  );
};

const EventTypeSelection = ({ eventTypeFilter, setEventTypeFilter }) => {
  return (
    <div className="form-inline d-inline-block d-lg-inline px-md-2 mt-2 mt-lg-0">
      <div
        className="btn-group btn-group-toggle align-bottom"
        data-toggle="buttons"
      >
        <label className="btn btn-secondary active">
          <input
            type="radio"
            onChange={() => setEventTypeFilter("all")}
            name="eventType"
            id="eventType-all"
            checked={eventTypeFilter === "all"}
          />{" "}
          All events
        </label>
        <label className="btn btn-secondary">
          <input
            type="radio"
            onChange={() => setEventTypeFilter("virtual")}
            name="eventType"
            id="eventType-virtual"
            checked={eventTypeFilter === "virtual"}
          />{" "}
          Virtual Only
        </label>
        <label className="btn btn-secondary">
          <input
            type="radio"
            onChange={() => setEventTypeFilter("onsite")}
            name="eventType"
            id="eventType-onsite"
            checked={eventTypeFilter === "onsite"}
          />{" "}
          On-Site Only
        </label>
      </div>
    </div>
  );
};

const EventList = ({
  events,
  title,
  timeZoneId,
  promoteMultidayEventsOnTop,
  eventRefs,
}) =>
  events.length > 0 && (
    <>
      <hr />
      <h3>{title}</h3>
      <GroupedEvents
        events={events}
        timeZoneId={timeZoneId}
        promoteMultidayEventsOnTop={promoteMultidayEventsOnTop}
        eventRefs={eventRefs}
      />
    </>
  );

const doesEventSpanMultipleDays = (event) => {
  const duration = Duration.between(event.date.start, event.date.end);
  return duration.toHours() >= 24;
};

const GroupedEvents = ({
  events,
  timeZoneId,
  promoteMultidayEventsOnTop,
  eventRefs,
}) => {
  if (events.length < 6) {
    return (
      <>
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            usersTimezone={timeZoneId}
            eventRefs={eventRefs}
          />
        ))}
      </>
    );
  }

  const groupedByDay = useMemo(
    () =>
      events
        .filter(
          (event) =>
            !(promoteMultidayEventsOnTop && doesEventSpanMultipleDays(event))
        )
        .reduce((byDay, event) => {
          const dateKey = LocalizedDate({
            date: event.date.start,
            timeZone: timeZoneId,
          });
          return {
            ...byDay,
            [dateKey]: [...(byDay[dateKey] || []), event],
          };
        }, {}),
    [events, timeZoneId]
  );

  const eventsByDay = Object.keys(groupedByDay)
    .sort()
    .map((dateKey) => (
      <Fragment key={dateKey}>
        <span className="text-muted font-weight-bold">{dateKey}</span>
        <div className="container-fluid px-0">
          <div>
            {groupedByDay[dateKey].length > 3 ? (
              <GroupedIntraDayEvents
                events={groupedByDay[dateKey]}
                timeZoneId={timeZoneId}
                eventRefs={eventRefs}
              />
            ) : (
              <>
                {groupedByDay[dateKey].map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    usersTimezone={timeZoneId}
                    eventRefs={eventRefs}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </Fragment>
    ));

  if (promoteMultidayEventsOnTop) {
    const multiDayEvents = events
      .filter(doesEventSpanMultipleDays)
      .map((event) => (
        <EventCard
          key={event.id}
          event={event}
          usersTimezone={timeZoneId}
          isPromotedMultidayEvent={true}
          eventRefs={eventRefs}
        />
      ));

    return [...multiDayEvents, ...eventsByDay];
  }

  return eventsByDay;
};

const GroupedIntraDayEvents = ({ events, timeZoneId, eventRefs }) => {
  const timeSlices = [
    ["Night (00:00 - 08:00)", LocalTime.of(8, 0, 0, 0)],
    ["Morning (08:00 - 12:00)", LocalTime.of(12, 0, 0, 0)],
    ["Afternoon (12:00 - 20:00)", LocalTime.of(20, 0, 0, 0)],
    ["Night (20:00 - 24:00)", LocalTime.MAX],
  ];

  const grouped = useMemo(() => {
    const result = timeSlices.map(() => []);
    outer: for (let event of events) {
      for (let sliceIdx in timeSlices) {
        const slice = timeSlices[sliceIdx];
        if (
          event.date.start
            .withZoneSameInstant(timeZoneId)
            .toLocalTime()
            .isBefore(slice[1])
        ) {
          result[sliceIdx].push(event);
          continue outer;
        }
      }
      result[timeSlices.length - 1].push(event);
    }
    return result;
  }, [events, timeZoneId]);

  return (
    <>
      {timeSlices.map((slice, i) =>
        grouped[i].length === 0 ? (
          ""
        ) : (
          <div key={slice[0]} className="container-fluid px-0 mb-2">
            <p className="px-1 my-0 text-muted font-weight-bold">{slice[0]}</p>
            {grouped[i].map((event) => (
              <EventCard
                key={event.id}
                event={event}
                usersTimezone={timeZoneId}
                eventRefs={eventRefs}
              />
            ))}
          </div>
        )
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("events")).render(<Events />);
