import { render, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import fetchEventsInChronologicalOrder from "./events/fetchEventsInChronologicalOrder";
import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
const { convert, ZonedDateTime } = jsjoda;
import "regenerator-runtime/runtime";

const UpcomingEvents = ({}) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

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
  const dateTimeFormatter = new Intl.DateTimeFormat("default", {
    dateStyle: "short",
    timeStyle: "short",
  });

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
          {upcomingEvents.slice(0, 5).map((event) => (
            <tr key={event.id}>
              <th>
                {dateTimeFormatter.format(convert(event.date.start).toDate())}
              </th>
              <td>
                <a href={event.url}>{event.title}</a>
              </td>
              <td>
                {event.location === "virtual"
                  ? "Virtual"
                  : `${event.location.city}, ${event.location.country}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

render(<UpcomingEvents />, document.querySelector("#upcoming-events"));
