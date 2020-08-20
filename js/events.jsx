import { Fragment, render, h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import "regenerator-runtime/runtime";
import EventCard from "./events/EventCard";

const Events = () => {
  const [eventList, setEventList] = useState([]);

  const scrollSpy = useRef(null);

  useEffect(() => {
    const Run = async () => {
      const result = await fetch("/events/events.json");
      setEventList(Object.values(await result.json()));
    };
    Run();
  }, []);

  return (
    <Fragment>
      <div class="jumbotron jumbotron-fluid m-0 p-0">
        <div class="container" style={{ lineHeight: "200%" }}>
          <h1 style='line-height: 1.5;font-size: 3rem;font-weight: 900;font-family: "Arial Black", Helvetica;'>
            My Timezone is{" "}
            <select>
              <option>UTC-1</option>
            </select>
            . <br />I want to attend an event that starts at{" "}
            <select>
              <option>9:00 AM</option>
            </select>
          </h1>
          <button>9 virtual events found</button>
          <button>10 on-site events found</button>
        </div>
      </div>
      <div class="bg-light text-dark py-5">
        <div ref={scrollSpy} style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
          {eventList.map((e) => (
            <EventCard event={e} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

render(<Events />, document.querySelector("#events"));
