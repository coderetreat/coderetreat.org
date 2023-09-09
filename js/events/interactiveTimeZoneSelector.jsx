import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

export default function interactiveTimeZoneSelector({ timeZone, setTimeZone }) {
  return (
    <div className="form-inline d-inline">
      <Typeahead
        id="timezoneSelector"
        defaultInputValue={timeZone}
        style={{ maxWidth: "95%", display: "inline-block" }}
        onChange={(values) => {
          if (!values.length) return;
          setTimeZone(values[0]);
        }}
        options={jsjoda.ZoneId.getAvailableZoneIds()}
      />
    </div>
  );
}
