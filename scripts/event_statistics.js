#!/usr/bin/env node
require("@js-joda/timezone");
const glob = require("glob").sync;
const { resolve, basename, dirname } = require("path");
const { readFileSync, statSync } = require("fs");
const { ZonedDateTime, Duration } = require("@js-joda/core");
const { Locale } = require("@js-joda/locale_en");


glob(__dirname + "/../_data/events/.SCHEMA.json")
  .sort()
  .forEach((schemaFile) => {
    console.log(
      "EVENTS FOR",
      dirname(schemaFile),
      "\n--------------------------------"
    );
    const events = glob(dirname(schemaFile) + "/*.json").sort(
      (file_1, file_2) => statSync(file_1).mtimeMs - statSync(file_2).mtimeMs
    );

    let total = Duration.ZERO;

    for (let eventFile of events) {
      const event = JSON.parse(readFileSync(eventFile).toString());

      const start = ZonedDateTime.parse(event.date.start);
      const end = ZonedDateTime.parse(event.date.end);

      total = total.plus(Duration.between(start, end))
    }

    console.log(total.toHours())
  });
