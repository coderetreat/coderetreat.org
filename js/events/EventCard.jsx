import { Fragment, render, h } from "preact";
import { useState } from "preact/hooks";
import classNames from "classnames";
import { LocalizedDate, LocalizedDateTime } from "./LocalizedDateTime";

const Format = ({ format }) => (
  <span
    style={{
      textDecorationLine: "underline",
      textDecorationStyle: "dashed",
    }}
    title={
      format === "classic"
        ? "Two people work on the same codebase"
        : "The whole group works on the same codebase"
    }
  >
    {format === "classic" ? "Pair-Programming" : "Ensemble"}
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

const baseStyle = {
  overflow: "hidden",
  transition: "max-height 1s",
};
const collapsedStyle = { ...baseStyle, overflow: "hidden", maxHeight: 0 };
const expandedStyle = { ...baseStyle, maxHeight: "1000px" };

export default ({ event, usersTimezone }) => {
  const [isCollapsed, setCollapsed] = useState(true);

  return (
    <div
      style={{
        display: "inline-block",
      }}
    >
      <div
        class="card m-md-3 my-3 event-card"
        style={{ width: "20rem", minHeight: "10em", whiteSpace: "normal" }}
        onClick={(e) => setCollapsed(!isCollapsed)}
      >
        <div
          class={classNames([
            "py-1",
            "small",
            "text-light",
            "font-weight-bold",
            "card-header",
            event.location === "virtual"
              ? "bg-virtual-event"
              : "bg-onsite-event",
          ])}
          style={{display: "flex", cursor: "pointer", justifyContent: "space-between"}}
        >
          <div>
            <LocalizedDate date={event.date.start} timeZone={usersTimezone} />
          </div>
          <div>
            {event.location === "virtual"
              ? "VIRTUAL"
              : event.location.city + ", " + event.location.country}{" "}
              {isCollapsed ? <i class="fas fa-caret-down"></i> : <i class="fas fa-caret-up"></i>}
          </div>
        </div>
        <div class="card-body m-0">
          <h5 class="card-title m-0">{event.title}</h5>
        </div>
        <div style={isCollapsed ? collapsedStyle : expandedStyle}>
          <ul class="list-group list-group-flush">
            {event.description && (
              <li class="list-group-item">
                <p class="card-text">{event.description}</p>
              </li>
            )}
            <li class="list-group-item">
              <b>Start: </b>
              <LocalizedDateTime
                date={event.date.start}
                timeZone={usersTimezone}
              />
              <br />
              <b>End: </b>
              <LocalizedDateTime
                date={event.date.end}
                timeZone={usersTimezone}
              />
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
    </div>
  );
};
