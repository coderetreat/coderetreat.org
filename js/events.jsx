import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
import { h, Fragment, render } from "preact";
import { useEffect, useMemo, useState, useRef } from "preact/hooks";
import "regenerator-runtime/runtime";
import fetchEventsInChronologicalOrder from "./events/fetchEventsInChronologicalOrder";
import displayEventAsTableRow from "./events/displayEventAsTableRow";
import interactiveTimeZoneSelector from "./events/interactiveTimeZoneSelector";

const { ZoneId, ChronoUnit } = jsjoda;

const DATE_FORMAT = jsjoda.DateTimeFormatter.ofPattern("u-M-F");
const DayOfEventContainer = (events, timeZoneId) => {
  const eventsByStartDate = {};
  for (let event of events) {
    const startDate = event.date.start
      .withZoneSameInstant(timeZoneId)
      .format(DATE_FORMAT);
    eventsByStartDate[startDate] = [
      ...(eventsByStartDate[startDate] || []),
      event,
    ];
  }

  return (
    <Fragment>
      <div class="day-of-event-container">
        {Object.keys(eventsByStartDate)
          .sort()
          .map((date) => (
            <Fragment>
              <h3 class="ml-0">Starting on {date}</h3>
              <table className="table">
                <tbody>
                <div class="mb-5 mr-md-5">
                  {eventsByStartDate[date].map((event) => displayEventAsTableRow(event)) }
                </div>
                </tbody>
              </table>
            </Fragment>
          ))}
      </div>
    </Fragment>
  );
};

const Events = () => {
  const [timeZone, setTimeZone] = useState(ZoneId.systemDefault().id());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const Run = async () => {
      const allEvents = await fetchEventsInChronologicalOrder();

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
      <div class="bg-light text-dark py-5">
        <div class="container-fluid p-3 pl-md-5 pr-md-0">
          <h1>
            <b>📅 Upcoming Coderetreat events</b>
          </h1>
          <p class="lead">
            All times shown are in the timezone for{" "}
            {interactiveTimeZoneSelector(timeZone, setTimeZone)}
          </p>
          {Object.keys(eventsByLocalDay).map((startTime, i) => (
              DayOfEventContainer(eventsByLocalDay[startTime], timeZoneId)))}
          <hr class="px-5 mr-5"/>
        </div>
      </div>
  );
};

render(<Events />, document.querySelector("#events"));
