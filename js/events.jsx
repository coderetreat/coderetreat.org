import * as jsjoda from "@js-joda/core";
import { h, render } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import "regenerator-runtime/runtime";
import fetchEventsInChronologicalOrder from "./events/fetchEventsInChronologicalOrder";
import displayEventAsTableRow from "./events/displayEventAsTableRow";
import interactiveTimeZoneSelector from "./events/interactiveTimeZoneSelector";
import { LocalizedDate } from "./events/LocalizedDateTime";
import EventCard from "./events/EventCard";

const { ZoneId, ZonedDateTime, ChronoUnit } = jsjoda;

const Events = () => {
  const [timeZone, setTimeZone] = useState(ZoneId.systemDefault().id());
  const timeZoneId = useMemo(() => ZoneId.of(timeZone), [timeZone]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const Run = async () => {
      const allEvents = await fetchEventsInChronologicalOrder();
      setEvents(
        allEvents.filter((event) => event.date.end.isAfter(ZonedDateTime.now()))
      );
    };
    Run();
  }, []);

  return (
    <div class="container">
      <h1 class="display-1 my-5">Next Events</h1>
      <p class="lead">
        Coderetreats happen all over the world and throughout the whole year!
        Find an event and join your first coderetreat!
      </p>
      <p>
        All times shown are in the timezone for{" "}
        {interactiveTimeZoneSelector(timeZone, setTimeZone)}
      </p>
      {events.map((event) => (
        <EventCard event={event} usersTimezone={timeZoneId} />
      ))}
      <hr class="px-5 mr-5" />
    </div>
  );
};


render(<Events />, document.querySelector("#events"));
