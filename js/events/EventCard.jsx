import classNames from "classnames";
import { useState, Fragment } from "react";
import { LocalizedDateTime } from "./LocalizedDateTime";

const Format = ({ format }) => {
  let title = "";
  let description = "";
  switch (format) {
    case "classic":
      title = "Pair-Programming";
      description = "Two people work on the same codebase together";
      break;
    case "ensemble":
      title = "Ensemble";
      description = "The whole group works on the same codebase";
      break;
    default:
      title = format;
      description = format;
  }
  return (
    <span
      style={{
        textDecorationLine: "underline",
        textDecorationStyle: "dashed",
      }}
      title={description}
    >
      {title}
    </span>
  );
};

const Moderators = ({ moderators }) => (
  <>
    {moderators.map((moderator, i) => (
      <Fragment key={moderator.name}>
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
  </>
);

const Sponsors = ({ sponsors }) => (
  <>
    {sponsors.map((sponsor, i) => (
      <Fragment key={sponsor.name}>
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
  </>
);

const baseStyle = {
  overflow: "hidden",
  transition: "max-height 500ms",
};
const collapsedStyle = { ...baseStyle, overflow: "hidden", maxHeight: 0 };
const expandedStyle = { ...baseStyle, maxHeight: "1000px" };

export default ({
  event,
  usersTimezone,
  isPromotedMultidayEvent,
  eventRefs,
}) => {
  const [isCollapsed, setCollapsed] = useState(true);

  const widthClasses = isPromotedMultidayEvent
    ? ["col-lg-12", "col-md-12"]
    : ["col-lg-4", "col-md-6"];

  return (
    <div
      ref={(el) => {
        if(!eventRefs || !eventRefs.current) return;
        eventRefs.current[event.id] = el;
      }}
      className={classNames([
        "d-inline-block",

        "col-12",
        "p-0",
        "p-lg-2",
        "p-md-1",
        ...widthClasses,
      ])}
    >
      <div
        className="card my-3 event-card shadow"
        style={{ minHeight: "1em", whiteSpace: "normal" }}
        onClick={(e) => setCollapsed(!isCollapsed)}
      >
        <div
          className={classNames([
            "py-1",
            "small",
            "text-light",
            "font-weight-bold",
            "card-header",
            event.location === "virtual"
              ? "bg-virtual-event"
              : "bg-onsite-event",
          ])}
        >
          <div
            style={{
              display: "flex",
              cursor: "pointer",
              justifyContent: "space-between",
            }}
          >
            <div>
              <LocalizedDateTime
                date={event.date.start}
                timeZone={usersTimezone}
              />
            </div>
            {!isPromotedMultidayEvent ? null : (
              <div className="d-none d-md-block">MULTI DAY EVENT</div>
            )}
            <div>
              {event.location === "virtual"
                ? "VIRTUAL"
                : event.location.city + ", " + event.location.country}{" "}
              {isCollapsed ? (
                <i className="fas fa-caret-down"></i>
              ) : (
                <i className="fas fa-caret-up"></i>
              )}
            </div>
          </div>
          {!isPromotedMultidayEvent ? null : (
            <div className="col-12 d-md-none text-center">MULTI DAY EVENT</div>
          )}
        </div>
        <div className="card-body m-0">
          <h5 className="card-title m-0">{event.title}</h5>
          <span className="d-block text-muted pt-1">
            {event.spoken_language}, <Format format={event.format} />
            {event.moderators && event.moderators.length > 1 ? (
              <>
                , with <Moderators moderators={event.moderators} />
              </>
            ) : null}
          </span>
        </div>
        <div style={isCollapsed ? collapsedStyle : expandedStyle}>
          <ul className="list-group list-group-flush">
            {event.description && (
              <li className="list-group-item bg-transparent">
                <p className="card-text">{event.description}</p>
              </li>
            )}
            <li className="list-group-item bg-transparent">
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
            <li className="list-group-item bg-transparent py-1">
              <b>Event format: </b>
              <Format format={event.format} />
            </li>
            <li className="list-group-item bg-transparent py-1">
              <b>Code of Conduct: </b>
              {event.code_of_conduct ? (
                <a href={event.code_of_conduct}>
                  external link <i className="fas fa-external-link-alt"></i>
                </a>
              ) : (
                "not specified"
              )}
            </li>
            <li className="list-group-item bg-transparent py-1">
              <b>Spoken language: </b>
              {event.spoken_language}
            </li>
            {event.moderators && event.moderators.length > 0 && (
              <li className="list-group-item bg-transparent py-1">
                <b>Moderators: </b>
                <Moderators moderators={event.moderators} />
              </li>
            )}
            {event.sponsors && event.sponsors.length > 0 && (
              <li className="list-group-item bg-transparent py-1">
                <b>Sponsors: </b>
                <Sponsors sponsors={event.sponsors} />
              </li>
            )}
          </ul>
          <div className="card-body">
            <a href={event.url} className="card-link btn btn-secondary">
              Sign-Up <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
