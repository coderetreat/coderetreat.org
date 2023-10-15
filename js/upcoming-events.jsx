import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "regenerator-runtime/runtime";
import displayEventAsTableRow from "./events/displayEventAsTableRow";
import fetchEventsInChronologicalOrder from "./events/fetchEventsInChronologicalOrder";
const { ZoneId, ZonedDateTime } = jsjoda;

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
          {upcomingEvents
            .slice(0, 5)
            .map((event) => displayEventAsTableRow(event, ZoneId.of(timeZone)))}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("upcoming-events")).render(
  <UpcomingEvents />
);
