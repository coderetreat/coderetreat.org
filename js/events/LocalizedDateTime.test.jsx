/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
import { LocalizedDate, LocalizedDateTime } from "./LocalizedDateTime";

const { ZonedDateTime } = jsjoda;

describe("Date Time Helper", () => {
  it("displays date and time in it's own timezone", () => {
    let date = ZonedDateTime.parse("2016-03-18T11:38:23.561Z");
    let timeZone = date.zone();
    render(<LocalizedDateTime date={date} timeZone={timeZone} />);
    expect(document.body).toHaveTextContent("2016-03-18, 11:38");
  });

  it("displays date in it's own timezone", () => {
    let date = ZonedDateTime.parse("2016-03-18T11:38:23.561Z");
    let timeZone = date.zone();
    render(<LocalizedDate date={date} timeZone={timeZone} />);
    expect(document.body).toHaveTextContent("2016-03-18");
    expect(document.body).not.toHaveTextContent("11:38");
  });
});
