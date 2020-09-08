import { render, h } from "preact";
import * as jsJoda from "@js-joda/core";
import {convert} from "@js-joda/core";
const { ZoneId } = jsJoda;

export default ({ event, usersTimezone }) => (
  <div style={{ display: "inline-block" }}>
    <div class="card m-3" style={{ width: "18rem", whiteSpace: "normal" }}>
      <div class="card-body">
        <h5 class="card-title">{event.title}</h5>
        <p class="card-text">{event.description}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          {convert(event.date.start)
            .toDate()
            .toUTCString()}{" "}
          -<br/>
          {convert(event.date.end)
            .toDate()
            .toUTCString()}
        </li>
        <li class="list-group-item">{event.format}</li>
        <li class="list-group-item">{event.spoken_language}</li>
      </ul>
      <div class="card-body">
        <a href={event.url} class="card-link">
          {event.url}
        </a>
      </div>
    </div>
  </div>
);
