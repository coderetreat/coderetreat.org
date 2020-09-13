import "regenerator-runtime/runtime";
import { render, Fragment, h } from "preact";
import { useState, useEffect, useCallback, useRef } from "preact/hooks";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";

const useInputValue = (initial) => {
  const [value, setValue] = useState(initial);
  return [
    value,
    useCallback((event) => setValue(event.target.value)),
    setValue,
  ];
};

const useCheckbox = (initial) => {
  const [value, setValue] = useState(initial);
  return [value, useCallback((event) => setValue(event.target.checked))];
};

const findCities = async (searchTerm) => {
  const response = await fetch(
    `https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      searchTerm
    )}.json?types=place&access_token=pk.eyJ1IjoicnJhZGN6ZXdza2kiLCJhIjoiY2tjZ2cyenJqMGp1YzJ0bHBrOTR5dHlsdyJ9.6kI34USWMzJ3hxS7j946xg`
  );
  if (!response.ok)
    throw new Error("Error while fetching cities: " + JSON.stringify(response));

  return (await response.json()).features;
};

const CityInput = ({ onAutoComplete, onBlur }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  return (
    <AsyncTypeahead
      isLoading={isLoading}
      labelKey="text"
      onChange={onAutoComplete}
      renderMenuItemChildren={(option) => option.place_name}
      onBlur={onBlur}
      onSearch={async (query) => {
        setIsLoading(true);
        const cities = await findCities(query);
        setIsLoading(false);
        setOptions(cities);
      }}
      options={options}
    />
  );
};

const tryParseDateTime = (time, timezone) => {
  if (timezone === "" || time === "") return ["", null];
  try {
    return [
      jsjoda.LocalDateTime.parse(time)
        .atZone(jsjoda.ZoneId.of(timezone))
        .withFixedOffsetZone()
        .toString(),
      null,
    ];
  } catch (e) {
    console.log(e);
    return ["", e];
  }
};

const Wizard = () => {
  const [title, setTitle] = useInputValue("");
  const [description, setDescription] = useInputValue("");
  const [url, setUrl] = useInputValue("");
  const [spokenLanguage, setSpokenLanguage] = useInputValue("");
  const [format, setFormat] = useInputValue("classic");
  const [coc, setCoc] = useInputValue("");
  const [startTime, setStartTime] = useInputValue("2020-11-06T09:00");
  const [endTime, setEndTime] = useInputValue("2020-11-06T16:00");

  const [isVirtual, setIsVirtual] = useCheckbox(false);
  const [city, setCity] = useState("");
  const [latitude, onChangeLatitude, setLatitude] = useInputValue("");
  const [longitude, onChangeLongitude, setLongitude] = useInputValue("");
  const [country, onChangeCountry, setCountry] = useInputValue("");

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

  return (
    <div className="container">
      <h2>Basic information</h2>
      <div class="form-row">
        <div class="form-group col-12 col-md-6">
          <label for="inputTitle">Title</label>
          <input
            type="text"
            class="form-control"
            id="inputTitle"
            placeholder="Your amazing event"
            value={title}
            onChange={setTitle}
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="inputDescription">
            Description <small>(optional)</small>
          </label>
          <input
            type="text"
            aria-aria-describedby="descriptionHelp"
            class="form-control"
            id="inputDescription"
            placeholder="A longer description of your event"
            value={description}
            onChange={setDescription}
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6 col-12">
          <label for="inputSpokenLanguage">Spoken language</label>
          <input
            type="text"
            class="form-control"
            id="inputSpokenLanguage"
            aria-aria-describedby="spokenLanguageHelp"
            placeholder="e.g. English"
            value={spokenLanguage}
            onChange={setSpokenLanguage}
          />
          <small id="spokenLanguageHelp" class="form-text text-muted">
            Please decide ahead which one is going to be the primary language of
            your event. This will make it easier for people to find a (virtual)
            event that they can participate in.
          </small>
        </div>
        <div class="form-group col-md-6 col-12">
          <label for="selectFormat">Format</label>
          <select
            class="form-control"
            id="selectFormat"
            aria-aria-describedby="formatHelp"
            value={format}
            onChange={setFormat}
          >
            <option value="classic">Classic (Pair Programming)</option>
            <option value="ensemble">Ensemble (Mob/Team Programming)</option>
          </select>
          <small id="formatHelp" class="form-text text-muted">
            If you plan on running the event as an ensemble, please pick that as
            the format.
          </small>
        </div>
      </div>
      <h2>Links</h2>
      <div class="form-row">
        <div class="form-group col-md-6 col-12">
          <label for="inputUrl">Event Link</label>
          <input
            type="url"
            class="form-control"
            id="inputUrl"
            aria-describedby="urlHelp"
            placeholder="e.g. link to your Eventbrite or Meetup page"
            value={url}
            onChange={setUrl}
          />
          <small id="urlHelp" class="form-text text-muted">
            In order for your event to be listed on coderetreat.org, it must
            have a public sign-up page. You are free to limit attendance to e.g.
            people of underrepresented minorities in tech, but we don't list
            e.g. employee-only events.
          </small>
        </div>
        <div class="form-group col-md-6 col-12">
          <label for="inputCoc">
            Code of Conduct Link <small>(optional)</small>
          </label>
          <input
            type="url"
            aria-describedby="cocHelp"
            class="form-control"
            id="inputCoc"
            placeholder="link to your Code of Conduct"
            value={coc}
            onChange={setCoc}
          />
          <small id="cocHelp" class="form-text text-muted">
            A Code of Conduct lines out the rules of your event. We highly
            recommend you adopt one and make sure that your attendees are aware
            of it. For more information, read here:{" "}
            <a href="/facilitators/hosting/#code-of-conduct">
              Hosting Guide#Code-of-Conduct
            </a>
          </small>
        </div>
      </div>
      <h2>Scheduling</h2>
      <div class="form-row form-group">
        <div class="col-md-4">
          <label for="inputTimezone">Timezone</label>
          <Typeahead
            defaultInputValue={timezone}
            onChange={(values) => setTimezone(values[0])}
            options={jsjoda.ZoneId.getAvailableZoneIds()}
          />
        </div>
        <div class="col-md-4">
          <label for="inputStartTime">Start</label>
          <input
            type="datetime-local"
            class="form-control"
            id="inputStartTime"
            placeholder="2020-11-06T06:00"
            value={startTime}
            onChange={setStartTime}
          />
        </div>
        <div class="col-md-4">
          <label for="inputEndTime">End</label>
          <input
            type="datetime-local"
            class="form-control"
            id="inputEndTime"
            placeholder="2020-11-06T06:00"
            value={endTime}
            onChange={setEndTime}
          />
        </div>
        <small id="cocHelp" class="col-12 form-text text-muted">
          Please make sure to double-check the times you plan to start your
          event, as it plays an essential role in how an attendee might pick an
          event.
        </small>
      </div>
      <h2>Location</h2>
      <div class="form-row">
        <div class="form-group col-12">
          <div class="form-check">
            <input
              id="isVirtual"
              class="form-check-input"
              type="checkbox"
              checked={isVirtual}
              onChange={setIsVirtual}
            />
            <label for="isVirtual" class="form-check-label">
              We're hosting a <strong>Virtual Event</strong>.
            </label>
          </div>
        </div>
      </div>
      {!isVirtual && (
        <Fragment>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">City</label>
              <CityInput onBlur={onBlur} onAutoComplete={onAutoSuggest} />
            </div>
            <div class="form-group col-md-6">
              <label for="inputCountry">Country</label>
              <input
                type="text"
                class="form-control"
                id="inputCountry"
                value={country}
                onChange={onChangeCountry}
              />
            </div>
          </div>
          <div class="form-row form-group">
            <div class="col-md-6">
              <label for="inputLatitude">Latitude</label>
              <input
                type="text"
                aria-aria-describedby="coordinatesHelp"
                class="form-control"
                id="inputLatitude"
                value={latitude}
                onChange={onChangeLatitude}
              />
            </div>
            <div class="col-md-6">
              <label for="inputLongitude">Longitude</label>
              <input
                type="text"
                aria-aria-describedby="coordinatesHelp"
                class="form-control"
                id="inputLongitude"
                value={longitude}
                onChange={onChangeLongitude}
              />
            </div>
            <small id="coordinatesHelp" class="form-text col-12 text-muted">
              If you want your event to show up on our map, please fill in the
              Lat/Long values in{" "}
              <a href="http://wiki.openstreetmap.org/wiki/EPSG:3857">
                EPSG:3857
              </a>
              .
            </small>
          </div>
        </Fragment>
      )}
      <h3>Your Registration Payload</h3>
      <pre class="bg-dark text-light p-2">
        {JSON.stringify(
          {
            title,
            description,
            format,
            spokenLanguage,
            url,
            code_of_conduct: coc,
            date: {
              start: fullStartTime,
              end: fullEndTime,
            },
            location: isVirtual
              ? "virtual"
              : {
                  city,
                  country,
                  latitude,
                  longitude,
                },
          },
          null,
          2
        )}
      </pre>
    </div>
  );
};

render(<Wizard />, document.querySelector("#wizard"));
