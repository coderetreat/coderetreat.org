import { Fragment, render, h } from "preact";
import classNames from "classnames";
import * as jsjoda from "@js-joda/core";
const { ZoneId, ZonedDateTime } = jsjoda;
const DATE_FORMAT = jsjoda.DateTimeFormatter.ofPattern("HH:mm (yyyy-MM-dd)");

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

const Moderators = ({ moderators }) => (
  <Fragment>
    {moderators.map((moderator, i) => (
      <Fragment>
        {moderator.url ? (
          <a key={i} href={moderator.url}>
            {moderator.name}
          </a>
        ) : (
          <span key={i}>{moderator.name}</span>
        )}
        {moderators.length > 1 && i < moderators.length - 1 && <span>, </span>}
      </Fragment>
    ))}
  </Fragment>
);

const Sponsors = ({ sponsors }) => (
  <Fragment>
    {sponsors.map((sponsor, i) => (
      <Fragment>
        {sponsor.url ? (
          <a key={i} href={sponsor.url}>
            {sponsor.name}
          </a>
        ) : (
          <span key={i}>{sponsor.name}</span>
        )}
        {sponsors.length > 1 && i < sponsors.length - 1 && <span>, </span>}
      </Fragment>
    ))}
  </Fragment>
);

export default ({ event, usersTimezone }) => (
  <div style={{ display: "inline-block" }}>
    <div class="card m-md-3 my-3 event-card" style={{ width: "20rem", whiteSpace: "normal" }}>
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
          <b>Start: </b>{event.date.start
            .withZoneSameInstant(usersTimezone)
            .format(DATE_FORMAT)}<br/>
            <b>End: </b>
          {event.date.end
            .withZoneSameInstant(usersTimezone)
            .format(DATE_FORMAT)}
        </li>
        <li class="list-group-item py-1">
          <b>Event format: </b>
          <Format format={event.format} />
        </li>
        <li class="list-group-item py-1">
          <b>Code of Conduct: </b>
          {event.code_of_conduct ? (
            <a href={event.code_of_conduct}>
              external link <i class="fas fa-external-link-alt"></i>
            </a>
          ) : (
            "not specified"
          )}
        </li>
        <li class="list-group-item py-1">
          <b>Spoken language: </b>
          {event.spoken_language}
        </li>
        {event.moderators && event.moderators.length > 0 && (
          <li class="list-group-item py-1">
            <b>Moderators: </b>
            <Moderators moderators={event.moderators} />
          </li>
        )}
        {event.sponsors && event.sponsors.length > 0 && (
          <li class="list-group-item py-1">
            <b>Sponsors: </b>
            <Sponsors sponsors={event.sponsors} />
          </li>
        )}
      </ul>
      <div class="card-body">
        <a href={event.url} class="card-link btn btn-secondary">
          Sign-Up <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  </div>
);
