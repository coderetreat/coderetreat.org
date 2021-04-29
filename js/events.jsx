import * as jsjoda from "@js-joda/core";
import { h, render } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import "regenerator-runtime/runtime";
import fetchEventsInChronologicalOrder from "./events/fetchEventsInChronologicalOrder";
import displayEventAsTableRow from "./events/displayEventAsTableRow";
import interactiveTimeZoneSelector from "./events/interactiveTimeZoneSelector";
import { LocalizedDate } from "./events/LocalizedDateTime";

const { ZoneId, ZonedDateTime, ChronoUnit } = jsjoda;

const Events = () => {
  const [timeZone, setTimeZone] = useState(ZoneId.systemDefault().id());
  const timeZoneId = useMemo(() => ZoneId.of(timeZone), [timeZone]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const Run = async () => {
      const allEvents = await fetchEventsInChronologicalOrder();
      setEvents(allEvents.filter((event) => event.date.end.isAfter(ZonedDateTime.now())));
    };
    Run();
  }, []);

  const eventsByLocalDay = useMemo(
    () =>
      events.reduce((grouped, event) => {
        const startDate = event.date.start
          .withZoneSameInstant(ZoneId.of(timeZone))
          .truncatedTo(ChronoUnit.DAYS)
          .toString();
        return {
          ...grouped,
          [startDate]: [...(grouped[startDate] || []), event],
        };
      }, {}),
    [events, timeZone]
  );

  return (
      <div class="bg-light text-dark py-5">
        <div class="container-fluid p-3 pl-md-5 pr-md-0">
          <h1>
            <b>📅 Upcoming Coderetreat events</b>
          </h1>
          <p class="lead">
            All times shown are in the timezone for{" "}
            {interactiveTimeZoneSelector(timeZone, setTimeZone)}
          </p>
          {Object.keys(eventsByLocalDay).map((startDate, i) => (
              DayOfEventContainer(eventsByLocalDay[startDate], timeZoneId)))}
          <hr class="px-5 mr-5"/>
        </div>
      </div>
  );
};

const DayOfEventContainer = (events, timeZoneId) => {
  return (
    <div class="day-of-event-container">
      <h3 class="ml-0">
        <LocalizedDate date={events[0].date.start} timeZone={timeZoneId} />
      </h3>
      <table className="table">
        <tbody>
        <div class="mb-5 mr-md-5">
          {events.map((event) => displayEventAsTableRow(event, timeZoneId)) }
        </div>
        </tbody>
      </table>
    </div>
  );
};

render(<Events />, document.querySelector("#events"));
