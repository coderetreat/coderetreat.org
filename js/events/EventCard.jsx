import { render, h } from "preact";
import * as jsJoda from "@js-joda/core";
import { convert } from "@js-joda/core";
import classNames from "classnames";
const { ZoneId } = jsJoda;

const Format = ({ format }) => (
  <span
    style={{
      textDecorationLine: "underline",
      textDecorationStyle: "dashed",
    }}
    title={format === "classic" ? "Pair-Programming" : "Mob"}
  >
    {format}
  </span>
);

export default ({ event, usersTimezone }) => (
  <div style={{ display: "inline-block" }}>
    <div class="card m-3" style={{ width: "20rem", whiteSpace: "normal" }}>
      <div
        class={classNames([
          "py-1",
          "small",
          "text-light",
          "font-weight-bold",
          "card-header",
          event.location === "virtual" ? "bg-virtual-event" : "bg-onsite-event",
        ])}
      >
        {event.location === "virtual"
          ? "VIRTUAL"
          : event.location.city + ", " + event.location.country}
      </div>
      <div class="card-body">
        <h5 class="card-title">{event.title}</h5>
        <p class="card-text">
          <div class="read-more">
            <p class="collapse" id={`collapse-event-${event.id}`}>
              {event.description}
            </p>
            <a
              class="collapsed"
              data-toggle="collapse"
              href={`#collapse-event-${event.id}`}
              aria-expanded="false"
              aria-controls={`collapse-event-${event.id}`}
            ></a>
          </div>
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          {convert(event.date.start).toDate().toUTCString()} -<br />
          {convert(event.date.end).toDate().toUTCString()}
        </li>
        <li class="list-group-item">
          <b>Event format:</b> <Format format={event.format} />
        </li>
        <li class="list-group-item">
          <b>Spoken language:</b> {event.spoken_language}
        </li>
      </ul>
      <div class="card-body">
        <a href={event.url} class="card-link">
          {event.url}
        </a>
      </div>
    </div>
  </div>
);
