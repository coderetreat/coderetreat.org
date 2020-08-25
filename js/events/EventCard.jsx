import { render, h } from "preact";
import * as jsJoda from "@js-joda/core";
const { ZoneId } = jsJoda;

export default ({ event }) => (
  <div style={{ display: "inline-block" }}>
    <div class="card m-3" style={{ width: "18rem", whiteSpace: "normal" }}>
      <div class="card-body">
        <h5 class="card-title">{event.title}</h5>
        <p class="card-text">{event.description}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{event.date.start.toString()}<br/>{event.date.start.withZoneSameInstant(ZoneId.UTC).toString()}</li>
        <li class="list-group-item">{event.date.end.toString()}</li>
        <li class="list-group-item">{event.format}</li>
        <li class="list-group-item">{event.spoken_language}</li>
        <li class="list-group-item">{event.location}</li>
      </ul>
      <div class="card-body">
        <a href="#" class="card-link">
          {event.url}
        </a>
        <a href="#" class="card-link">
          {event.moderators}
        </a>
      </div>
    </div>
  </div>
);
