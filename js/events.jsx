import * as jsjoda from "@js-joda/core";
import { h, render, Fragment } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import "regenerator-runtime/runtime";
import fetchEventsInChronologicalOrder from "./events/fetchEventsInChronologicalOrder";
import InteractiveTimeZoneSelector from "./events/interactiveTimeZoneSelector";
import EventCard from "./events/EventCard";
import jekyllConfig from "../_config.yml";
import { LocalizedDate } from "./events/LocalizedDateTime";

const { ZoneId, Duration, ZonedDateTime, LocalDate, LocalTime } = jsjoda;

const earliestGDCRStart = LocalDate.parse(
  jekyllConfig.globalday.start
).atStartOfDay(ZoneId.of("UTC+12"));
const latestGDCREnd = LocalDate.parse(jekyllConfig.globalday.end)
  .atStartOfDay(ZoneId.of("UTC-12"))
  .plusDays(1);
const isCurrentDateAfterGDCR = ZonedDateTime.now().isAfter(latestGDCREnd);

const Events = () => {
  const [timeZone, setTimeZone] = useState(ZoneId.systemDefault().id());
  const timeZoneId = useMemo(() => ZoneId.of(timeZone), [timeZone]);
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [allEvents, setAllEvents] = useState([]);
  const [{ eventsBeforeGDCR, eventsDuringGDCR, eventsAfterGDCR }, setEvents] =
    useState({
      eventsBeforeGDCR: [],
      eventsDuringGDCR: [],
      eventsAfterGDCR: [],
    });

  useEffect(() => {
    const Run = async () => {
      const allFetchedEvents = await fetchEventsInChronologicalOrder();
      setAllEvents(allFetchedEvents);
    };
    Run();
  }, []);

  useEffect(() => {
    let eventsFilteredByType = allEvents;
    if (eventTypeFilter === "virtual") {
      eventsFilteredByType = eventsFilteredByType.filter(
        (event) => event.location === "virtual"
      );
    } else if (eventTypeFilter === "onsite") {
      eventsFilteredByType = eventsFilteredByType.filter(
        (event) => event.location !== "virtual"
      );
    }

    const upcomingEvents = eventsFilteredByType.filter((event) =>
      event.date.end.isAfter(ZonedDateTime.now())
    );
    const eventsBeforeGDCR = upcomingEvents.filter((event) =>
      event.date.end.isBefore(earliestGDCRStart)
    );
    const eventsDuringGDCR = upcomingEvents.filter(
      (event) =>
        (event.date.end.isEqual(earliestGDCRStart) ||
          event.date.end.isAfter(earliestGDCRStart)) &&
        (event.date.start.isEqual(latestGDCREnd) ||
          event.date.start.isBefore(latestGDCREnd))
    );
    const eventsAfterGDCR = upcomingEvents.filter((event) =>
      event.date.start.isAfter(latestGDCREnd)
    );
    setEvents({ eventsBeforeGDCR, eventsDuringGDCR, eventsAfterGDCR });
  }, [allEvents, eventTypeFilter]);

  return (
    <div>
      <div class="container" style={{ minHeight: "max(60vh, 500px)" }}>
        <h1 class="display-1 my-5 ">Next Events</h1>
        <p class="lead">
          Coderetreats happen all over the world and throughout the whole year!
          Find an event and join your first coderetreat!
        </p>
        <p>
          All times shown are in the timezone for{" "}
          <InteractiveTimeZoneSelector
            timeZone={timeZone}
            setTimeZone={setTimeZone}
          />
          <EventTypeSelection
            eventTypeFilter={eventTypeFilter}
            setEventTypeFilter={setEventTypeFilter}
          />
        </p>
        <EventList
          title="Events before Global Day of Coderetreat"
          events={eventsBeforeGDCR}
          timeZoneId={timeZoneId}
        />
        <EventList
          title={`Global Day of Coderetreat events (${new Date(
            jekyllConfig.globalday.start
          ).toLocaleDateString()} - ${new Date(
            jekyllConfig.globalday.end
          ).toLocaleDateString()})`}
          events={eventsDuringGDCR}
          timeZoneId={timeZoneId}
          promoteMultidayEventsOnTop={true}
        />
        <EventList
          title={
            isCurrentDateAfterGDCR
              ? "Upcoming events"
              : "Events after Global Day of Coderetreat"
          }
          events={eventsAfterGDCR}
          timeZoneId={timeZoneId}
        />
      </div>
    </div>
  );
};

const EventTypeSelection = ({ eventTypeFilter, setEventTypeFilter }) => {
  return (
    <div class="form-inline d-inline-block d-lg-inline px-md-2 mt-2 mt-lg-0">
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

const EventList = ({ events, title, timeZoneId, promoteMultidayEventsOnTop }) =>
  events.length > 0 && (
    <Fragment>
      <hr />
      <h3>{title}</h3>
      <GroupedEvents
        events={events}
        timeZoneId={timeZoneId}
        promoteMultidayEventsOnTop={promoteMultidayEventsOnTop}
      />
    </Fragment>
  );

const doesEventSpanMultipleDays = (event) => {
  const duration = Duration.between(event.date.start, event.date.end);
  console.log(duration.toHours(), "WOOP", event.title);
  return duration.toHours() >= 24;
};

const GroupedEvents = ({ events, timeZoneId, promoteMultidayEventsOnTop }) => {
  if (events.length < 6) {
    return (
      <Fragment>
        {events.map((event) => (
          <EventCard event={event} usersTimezone={timeZoneId} />
        ))}
      </Fragment>
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
      <Fragment>
        <span class="text-muted font-weight-bold">{dateKey}</span>
        <div className="container-fluid px-0">
          <div>
            {groupedByDay[dateKey].length > 3 ? (
              <GroupedIntraDayEvents
                events={groupedByDay[dateKey]}
                timeZoneId={timeZoneId}
              />
            ) : (
              <Fragment>
                {groupedByDay[dateKey].map((event) => (
                  <EventCard event={event} usersTimezone={timeZoneId} />
                ))}
              </Fragment>
            )}
          </div>
        </div>
      </Fragment>
    ));

  if (promoteMultidayEventsOnTop) {
    const multiDayEvents = events
      .filter(doesEventSpanMultipleDays)
      .map((event) => (
        <EventCard event={event} usersTimezone={timeZoneId} isPromotedMultidayEvent={true} />
      ));

    return [...multiDayEvents, ...eventsByDay];
  }

  return eventsByDay;
};

const GroupedIntraDayEvents = ({ events, timeZoneId }) => {
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
    <Fragment>
      {timeSlices.map((slice, i) =>
        grouped[i].length === 0 ? (
          ""
        ) : (
          <div className="container-fluid px-0 mb-2">
            <p className="px-1 my-0 text-muted font-weight-bold">{slice[0]}</p>
            {grouped[i].map((event) => (
              <EventCard event={event} usersTimezone={timeZoneId} />
            ))}
          </div>
        )
      )}
    </Fragment>
  );
};

render(<Events />, document.querySelector("#events"));
