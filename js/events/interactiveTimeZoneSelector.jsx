import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
import { h, Fragment, render } from "preact";
import {Typeahead} from "react-bootstrap-typeahead";


export default function interactiveTimeZoneSelector({timeZone, setTimeZone}) {
  return <div class="form-inline d-inline">
    <Typeahead
      defaultInputValue={timeZone}
      style={{maxWidth: "95%", display: "inline-block"}}
      onChange={(values) => {
        if (!values.length) return;
        setTimeZone(values[0]);
      }}
      options={jsjoda.ZoneId.getAvailableZoneIds()}
    />
  </div>;
}