#!/usr/bin/env node
require("@js-joda/timezone");
const util = require("util");
const glob = require("glob").sync;
const slug = require("slug");
const { resolve, basename, dirname } = require("path");
const { readFileSync, statSync, renameSync } = require("fs");
const { ZonedDateTime, DateTimeFormatter } = require("@js-joda/core");
const { Locale } = require("@js-joda/locale_en");
const { event } = require("jquery");
const path = require("path");

const run = async () => {
  const baseDir = __dirname + "/../_data/events/";
  const eventFiles = glob(baseDir + "*.json");

  for (let eventFile of eventFiles) {
    const event = JSON.parse(readFileSync(eventFile).toString());
    const newFilename = filenameForEvent(event);
    const oldFilename = path.basename(eventFile);
    if (oldFilename == newFilename) {
      console.log(oldFilename, "skipping");
      continue;
    }
    console.log(oldFilename, "renaming to", newFilename);
    renameSync(eventFile, path.join(baseDir, newFilename));
  }
};

const filenameForEvent = (event) => {
  const location =
    event.location === "virtual"
      ? "virtual"
      : `${event.location.country}-${event.location.city}`;
  return (
    slug(`${event.date.start.substring(0, 10)}-${location}-${event.title}`) +
    ".json"
  );
};

run();
