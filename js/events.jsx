import * as jsjoda from "@js-joda/core";
import { h, render, Fragment } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import "regenerator-runtime/runtime";
import fetchEventsInChronologicalOrder from "./events/fetchEventsInChronologicalOrder";
import displayEventAsTableRow from "./events/displayEventAsTableRow";
import interactiveTimeZoneSelector from "./events/interactiveTimeZoneSelector";
import { LocalizedDate } from "./events/LocalizedDateTime";
import EventCard from "./events/EventCard";
import jekyllConfig from '../_config.yml'

const { ZoneId, ZonedDateTime, LocalDate, ChronoUnit } = jsjoda;

const DATETIME_FORMAT = jsjoda.DateTimeFormatter.ofPattern("u-M-d, HH:mm");
const earliestGDCRStart = LocalDate.parse(jekyllConfig.globalday.start).atStartOfDayWithZone(ZoneId.of("UTC+12"));
const latestGDCREnd = LocalDate.parse(jekyllConfig.globalday.end).atStartOfDayWithZone(ZoneId.of("UTC-12")).plusDays(1);
const isCurrentDateAfterGDCR = ZonedDateTime.now().isAfter(latestGDCREnd);

const Events = () => {
  const [timeZone, setTimeZone] = useState(ZoneId.systemDefault().id());
  const timeZoneId = useMemo(() => ZoneId.of(timeZone), [timeZone]);
  const [{eventsBeforeGDCR, eventsDuringGDCR, eventsAfterGDCR}, setEvents] =
    useState({eventsBeforeGDCR: [], eventsDuringGDCR: [], eventsAfterGDCR: []});

  useEffect(() => {
    const Run = async () => {
      const allEvents = await fetchEventsInChronologicalOrder();
      const upcomingEvents = allEvents.filter((event) => event.date.end.isAfter(ZonedDateTime.now()))
      const eventsBeforeGDCR = upcomingEvents.filter((event) => event.date.start.isBefore(earliestGDCRStart));
      const eventsDuringGDCR = upcomingEvents.filter((event) =>
        event.date.start.isAfter(earliestGDCRStart) &&
        event.date.start.isBefore(latestGDCREnd));
      const eventsAfterGDCR = upcomingEvents.filter((event) => event.date.start.isAfter(latestGDCREnd));
      setEvents({eventsBeforeGDCR, eventsDuringGDCR, eventsAfterGDCR});
    };
    Run();
  }, []);

  return (
    <div>
      <div class="container" style={{minHeight: "max(60vh, 500px)"}}>
        <h1 class="display-1 my-5 ">Next Events</h1>
        <p class="lead">
          Coderetreats happen all over the world and throughout the whole year!
          Find an event and join your first coderetreat!
        </p>
        <p>
          All times shown are in the timezone for{" "}
          {interactiveTimeZoneSelector(timeZone, setTimeZone)}
        </p>
        {isCurrentDateAfterGDCR?<Fragment>
          <h3>Upcoming Events</h3>
          <div className="container-fluid p-1">
            {eventsAfterGDCR.map((event) => (
              <EventCard event={event} usersTimezone={timeZoneId}/>
            ))}
          </div>
        </Fragment>:<Fragment>
        <hr/>
        <h3>Events before Global Day of Coderetreat</h3>
        <div class="container-fluid p-1">
        {eventsBeforeGDCR.map((event) => (
          <EventCard event={event} usersTimezone={timeZoneId} />
        ))}
        </div>
        <hr/>
        <h3>Global Day of Coderetreat events</h3>
        <div class="container-fluid p-1">
        {eventsDuringGDCR.map((event) => (
          <EventCard event={event} usersTimezone={timeZoneId} />
        ))}
        </div>
        <hr/>
        <h3>Events after Global Day of Coderetreat</h3>
        <div class="container-fluid p-1">
        {eventsAfterGDCR.map((event) => (
          <EventCard event={event} usersTimezone={timeZoneId} />
        ))}
        </div>
        </Fragment>}
      </div>
    </div>
  );
};

render(<Events />, document.querySelector("#events"));
