import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import ReactDOM from "react-dom/client";
import "regenerator-runtime/runtime";
import slug from "slug";
import jekyllConfigRaw from "../_config.yml?raw";
import { parse } from "yaml";
import { CityInput } from "./register-wizard/CityInput";
import { CopyToClipboardButton } from "./register-wizard/CopyToClipboardButton";
import { DownloadButton } from "./register-wizard/DownloadButton";
import {
  useCheckbox,
  useInputValue,
  useTabular,
} from "./register-wizard/hooks";
import { PayloadPresentation } from "./register-wizard/PayloadPresentation";
import validateEvent from "./register-wizard/validateEvent";

const siteConfig = parse(jekyllConfigRaw);

const tryParseDateTime = (time, timezone) => {
  if (timezone === "" || time === "") return ["", null];
  try {
    return [
      jsjoda.DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(
        jsjoda.LocalDateTime.parse(time)
          .atZone(jsjoda.ZoneId.of(timezone))
          .withFixedOffsetZone()
      ),
      null,
    ];
  } catch (e) {
    return ["", e];
  }
};

const dropEmptyKeys = (obj) =>
  typeof obj !== "object"
    ? obj
    : Object.keys(obj).reduce((o, k) => {
        if (!obj[k] || obj[k] == "") return o;
        if (Array.isArray(obj[k]))
          return { ...o, [k]: obj[k].map(dropEmptyKeys) };
        if (typeof obj[k] === "object")
          return { ...o, [k]: dropEmptyKeys(obj[k]) };
        return { ...o, [k]: obj[k] };
      }, {});

const slugifyEvent = (payload) => {
  const segments = [
    payload.date.start.slice(0, 10),
    ...(payload.location === "virtual"
      ? ["virtual"]
      : [payload.location.country, payload.location.city]),
    payload.title,
  ].filter((a) => !!a);

  return slug(segments.join("-"));
};

const Wizard = () => {
  const [title, setTitle] = useInputValue("");
  const [description, setDescription] = useInputValue("");
  const [url, setUrl] = useInputValue("");
  const [spokenLanguage, setSpokenLanguage] = useInputValue("");
  const [format, setFormat] = useInputValue("classic");
  const [coc, setCoc] = useInputValue("");
  const [startTime, setStartTime] = useInputValue(
    `${siteConfig.globalday.start}T09:00`
  );
  const [endTime, setEndTime] = useInputValue(
    `${siteConfig.globalday.start}T16:00`
  );

  const [isVirtual, setIsVirtual] = useCheckbox(false);
  const [city, setCity] = useState("");
  const [latitude, onChangeLatitude, setLatitude] = useInputValue("");
  const [longitude, onChangeLongitude, setLongitude] = useInputValue("");
  const [country, onChangeCountry, setCountry] = useInputValue("");

  const [mods, updateMod, deleteMod] = useTabular({
    name: "",
    url: "",
  });
  const [sponsors, updateSponsor, deleteSponsor] = useTabular({
    name: "",
    url: "",
  });

  const [timezone, setTimezone] = useState(
    jsjoda.ZoneId.systemDefault().normalized().toString()
  );

  const [fullStartTime, fullStartTimeError] = tryParseDateTime(
    startTime,
    timezone
  );
  const [fullEndTime, fullEndTimeError] = tryParseDateTime(endTime, timezone);

  const onAutoSuggest = useCallback((result) => {
    if (!result.length) return;
    setCity(result[0].text);
    setCountry(result[0].context.slice(-1)[0].text);
    setLatitude(result[0].center[1]);
    setLongitude(result[0].center[0]);
  });

  const onBlur = useCallback((e) => {
    if (e.target.value != city) setCity(e.target.value);
  });

  const payload = dropEmptyKeys({
    title,
    description:
      description && description.length > 0 ? description : undefined,
    format,
    spoken_language: spokenLanguage,
    url,
    code_of_conduct: coc && coc.length > 0 ? coc : undefined,
    date: {
      start: fullStartTime,
      end: fullEndTime,
    },
    moderators: mods.filter((mod) => mod.name.length > 0 || mod.url.length > 0),
    sponsors: sponsors.filter(
      (sponsor) => sponsor.name.length > 0 || sponsor.url.length > 0
    ),
    location: isVirtual
      ? "virtual"
      : {
          city,
          country,
          coordinates: {
            latitude: Number(latitude),
            longitude: Number(longitude),
          },
        },
  });
  const isValid = validateEvent(payload);

  const suggestedFilename = slugifyEvent(payload);

  const payloadAsFormattedString = JSON.stringify(payload, null, 2);

  return (
    <div className="container bg-light p-md-4 px-2 py-3 drop-shadow-small">
      <h2>Basic information</h2>
      <div className="form-row">
        <div className="form-group col-12 col-md-6">
          <label htmlFor="inputTitle">Title</label>
          <input
            type="text"
            className="form-control"
            id="inputTitle"
            placeholder="Your amazing event"
            value={title}
            onChange={setTitle}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-12">
          <label htmlFor="inputDescription">
            Description <small>(optional)</small>
          </label>
          <input
            type="text"
            aria-describedby="descriptionHelp"
            className="form-control"
            id="inputDescription"
            placeholder="A longer description of your event"
            value={description}
            onChange={setDescription}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6 col-12">
          <label htmlFor="inputSpokenLanguage">Spoken language</label>
          <input
            type="text"
            className="form-control"
            id="inputSpokenLanguage"
            aria-describedby="spokenLanguageHelp"
            placeholder="e.g. English"
            value={spokenLanguage}
            onChange={setSpokenLanguage}
          />
          <small id="spokenLanguageHelp" className="form-text text-muted">
            Please decide ahead which one is going to be the primary language of
            your event. This will make it easier for people to find a (virtual)
            event that they can participate in.
          </small>
        </div>
        <div className="form-group col-md-6 col-12">
          <label htmlFor="selectFormat">Format</label>
          <select
            className="form-control"
            id="selectFormat"
            aria-describedby="formatHelp"
            value={format}
            onChange={setFormat}
          >
            <option value="classic">Classic (Pair Programming)</option>
            <option value="ensemble">Ensemble (Mob/Team Programming)</option>
          </select>
        </div>
      </div>
      <h2>Links</h2>
      <div className="form-row">
        <div className="form-group col-md-6 col-12">
          <label htmlFor="inputUrl">Event Link</label>
          <input
            type="url"
            className="form-control"
            id="inputUrl"
            aria-describedby="urlHelp"
            placeholder="e.g. link to your Eventbrite or Meetup page"
            value={url}
            onChange={setUrl}
          />
          <small id="urlHelp" className="form-text text-muted">
            In order for your event to be listed on coderetreat.org, it must
            have a public sign-up page. You are free to limit attendance to e.g.
            people of underrepresented minorities in tech, but we don't list
            e.g. employee-only events.
          </small>
        </div>
        <div className="form-group col-md-6 col-12">
          <label htmlFor="inputCoc">
            Code of Conduct Link <small>(optional)</small>
          </label>
          <input
            type="url"
            aria-describedby="cocHelp"
            className="form-control"
            id="inputCoc"
            placeholder="link to your Code of Conduct"
            value={coc}
            onChange={setCoc}
          />
          <small id="cocHelp" className="form-text text-muted">
            A Code of Conduct lines out the rules of your event. We highly
            recommend you adopt one and make sure that your attendees are aware
            of it. For more information, read here:{" "}
            <a href="/facilitators/hosting/#code-of-conduct">
              Hosting Guide#Code-of-Conduct
            </a>
          </small>
        </div>
      </div>
      <h2>Moderators</h2>
      <div className="form-row form-group">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>
                Website <small>(optional)</small>
              </th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {mods.map((mod, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    value={mod.name}
                    className="form-control form-control-sm"
                    onChange={(e) => updateMod(i, { name: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="e.g. GitHub/Twitter Profile"
                    value={mod.url}
                    className="form-control form-control-sm"
                    onChange={(e) => updateMod(i, { url: e.target.value })}
                  />
                </td>
                <td>
                  <button
                    aria-description="Remove moderator"
                    alt="Remove moderator"
                    onClick={(e) => deleteMod(i)}
                    className="btn btn-sm btn-danger"
                  >
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Sponsors</h2>
      <div className="form-row form-group">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>
                Website <small>(optional)</small>
              </th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((sponsor, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    value={sponsor.name}
                    className="form-control form-control-sm"
                    onChange={(e) => updateSponsor(i, { name: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Website/Social Media"
                    value={sponsor.url}
                    className="form-control form-control-sm"
                    onChange={(e) => updateSponsor(i, { url: e.target.value })}
                  />
                </td>
                <td>
                  <button
                    aria-description="Remove sponsor"
                    alt="Remove sponsor"
                    onClick={(e) => deleteMod(i)}
                    className="btn btn-sm btn-danger"
                  >
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Scheduling</h2>
      <div className="form-row form-group">
        <div className="col-md-4">
          <label htmlFor="inputTimezone">Timezone</label>
          <Typeahead
            id="inputTimezone"
            defaultInputValue={timezone}
            onChange={(values) => setTimezone(values[0])}
            options={jsjoda.ZoneId.getAvailableZoneIds()}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputStartTime">Start</label>
          <input
            type="datetime-local"
            className={classNames("form-control", {
              "is-invalid": !!fullStartTimeError,
            })}
            id="inputStartTime"
            placeholder={`${siteConfig.globalday.start}T09:00`}
            value={startTime}
            onChange={setStartTime}
          />
          <div className="invalid-feedback">
            {fullStartTimeError && fullStartTimeError.message}
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputEndTime">End</label>
          <input
            type="datetime-local"
            className={classNames("form-control", {
              "is-invalid": !!fullEndTimeError,
            })}
            id="inputEndTime"
            placeholder={`${siteConfig.globalday.start}T16:00`}
            value={endTime}
            onChange={setEndTime}
          />
          <div className="invalid-feedback">
            {fullEndTimeError && fullEndTimeError.message}
          </div>
        </div>
        <small id="cocHelp" className="col-12 form-text text-muted">
          Please make sure to double-check the times you plan to start your
          event, as it plays an essential role in how an attendee might pick an
          event.
        </small>
      </div>
      <h2>Location</h2>
      <div className="form-row">
        <div className="form-group col-12">
          <div className="form-check">
            <input
              id="isVirtual"
              className="form-check-input"
              type="checkbox"
              checked={isVirtual}
              onChange={setIsVirtual}
            />
            <label htmlFor="isVirtual" className="form-check-label">
              We're hosting a <strong>Virtual Event</strong>.
            </label>
          </div>
        </div>
      </div>
      {!isVirtual && (
        <>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <CityInput onBlur={onBlur} onAutoComplete={onAutoSuggest} />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputCountry">Country</label>
              <input
                type="text"
                className="form-control"
                id="inputCountry"
                value={country}
                onChange={onChangeCountry}
              />
            </div>
          </div>
          <div className="form-row form-group">
            <div className="col-md-6">
              <label htmlFor="inputLatitude">Latitude</label>
              <input
                type="text"
                aria-describedby="coordinatesHelp"
                className="form-control"
                id="inputLatitude"
                value={latitude}
                onChange={onChangeLatitude}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputLongitude">Longitude</label>
              <input
                type="text"
                aria-describedby="coordinatesHelp"
                className="form-control"
                id="inputLongitude"
                value={longitude}
                onChange={onChangeLongitude}
              />
            </div>
            <small id="coordinatesHelp" className="form-text col-12 text-muted">
              If you want your event to show up on our map, please fill in the
              Lat/Long values in{" "}
              <a href="http://wiki.openstreetmap.org/wiki/EPSG:3857">
                EPSG:3857
              </a>
              .
            </small>
          </div>
        </>
      )}
      <h3>Your Registration Payload</h3>
      <pre className="bg-dark text-light px-2 my-0 border-bottom border-light">
        ./data/_events/{suggestedFilename}.json{" "}
        <span className="text-success">(Suggested filename)</span>
      </pre>
      <PayloadPresentation payload={payloadAsFormattedString} />
      <div className="form-group">
        <DownloadButton
          text={payloadAsFormattedString}
          filename={suggestedFilename}
        />
        &nbsp;
        <CopyToClipboardButton text={payloadAsFormattedString} />
        &nbsp;
        {isValid ? (
          <button className="my-1 btn btn-success">Valid</button>
        ) : (
          <button
            role="button"
            aria-expanded="false"
            aria-controls="errorCollapse"
            data-toggle="collapse"
            data-target="#errorCollapse"
            className="my-1 btn btn-danger"
          >
            {validateEvent.errors.length} Problem(s)
          </button>
        )}
      </div>
      <div className="collapse my-2" id="errorCollapse">
        {!isValid && (
          <>
            <p>
              We can only provide you with the raw output of our JSON Schema
              validator here. Sorry for that.
            </p>
            <pre className="p-2 border bg-white border-danger rounded">
              {JSON.stringify(validateEvent.errors, null, 2)}
            </pre>
          </>
        )}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("wizard")).render(<Wizard />);
