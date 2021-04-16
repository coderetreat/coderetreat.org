import { render, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import fetchEventsInChronologicalOrder from "./events/fetchEventsInChronologicalOrder";
import displayEventAsTableRow from "./events/displayEventAsTableRow";
import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
const { ZoneId, ZonedDateTime } = jsjoda;
import "regenerator-runtime/runtime";

const UpcomingEvents = ({}) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [timeZone, setTimeZone] = useState(ZoneId.systemDefault().id());

  useEffect(() => {
    const run = async () => {
      const allEvents = await fetchEventsInChronologicalOrder();
      setUpcomingEvents(
        allEvents.filter((event) => event.date.end.isAfter(ZonedDateTime.now()))
      );
    };

    run();
  }, []);

  if (upcomingEvents.length === 0) {
    return (
      <div>
        <p className="lead">📅 No upcoming events</p>
        <a href="/facilitators/">Time to host one yourself!</a>
      </div>
    );
  }


  return (
    <div>
      <p className="lead">
        📅 Upcoming events{" "}
        <span className="muted">
          (<a href="/events/">view all {upcomingEvents.length} events</a>)
        </span>
      </p>
      <table className="table">
        <tbody>
          {upcomingEvents.slice(0, 5).map((event) => displayEventAsTableRow(event,ZoneId.of(timeZone)))}
        </tbody>
      </table>
    </div>
  );
};

render(<UpcomingEvents />, document.querySelector("#upcoming-events"));
