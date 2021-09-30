import * as jsjoda from "@js-joda/core";
import { h, render, Fragment } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import "regenerator-runtime/runtime";
import fetchEventsInChronologicalOrder from "./events/fetchEventsInChronologicalOrder";
import interactiveTimeZoneSelector from "./events/interactiveTimeZoneSelector";
import EventCard from "./events/EventCard";
import jekyllConfig from "../_config.yml";

const { ZoneId, ZonedDateTime, LocalDate } = jsjoda;

const earliestGDCRStart = LocalDate.parse(
  jekyllConfig.globalday.start
).atStartOfDayWithZone(ZoneId.of("UTC+12"));
const latestGDCREnd = LocalDate.parse(jekyllConfig.globalday.end)
  .atStartOfDayWithZone(ZoneId.of("UTC-12"))
  .plusDays(1);
const isCurrentDateAfterGDCR = ZonedDateTime.now().isAfter(latestGDCREnd);

const Events = () => {
  const [timeZone, setTimeZone] = useState(ZoneId.systemDefault().id());
  const timeZoneId = useMemo(() => ZoneId.of(timeZone), [timeZone]);
  const [{ eventsBeforeGDCR, eventsDuringGDCR, eventsAfterGDCR }, setEvents] =
    useState({
      eventsBeforeGDCR: [],
      eventsDuringGDCR: [],
      eventsAfterGDCR: [],
    });

  useEffect(() => {
    const Run = async () => {
      const allEvents = await fetchEventsInChronologicalOrder();
      const upcomingEvents = allEvents.filter((event) =>
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
    };
    Run();
  }, []);

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
          {interactiveTimeZoneSelector(timeZone, setTimeZone)}
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

const EventList = ({ events, title, timeZoneId }) =>
  events.length > 0 && (
    <Fragment>
      <hr />
      <h3>{title}</h3>
      <div class="container-fluid p-1">
        {events.map((event) => (
          <EventCard event={event} usersTimezone={timeZoneId} />
        ))}
      </div>
    </Fragment>
  );

render(<Events />, document.querySelector("#events"));
