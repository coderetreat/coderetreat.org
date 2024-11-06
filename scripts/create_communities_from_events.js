#!/usr/bin/env node
require("@js-joda/timezone");
const util = require("util");
const glob = require("glob").sync;
const slug = require("slug");
const { resolve, basename, dirname } = require("path");
const { readFileSync, statSync, renameSync, existsSync } = require("fs");
const { writeFile } = require("fs/promises");
const { ZonedDateTime, DateTimeFormatter } = require("@js-joda/core");
const { Locale } = require("@js-joda/locale_en");
const { event } = require("jquery");
const path = require("path");
const jsdom = require("jsdom");

const processMeetup = async (meetupId, events) => {
  // HERE BE MAGIC


  if (!name) throw `Could not find name for ${meetupId}`;

  const lastEvent = events.sort((a, b) => {
    return new Date(a.date.start) - new Date(b.date.start);
  })[0];

  const community = {
    name: name,
    location: lastEvent.location,
    url: `https://meetup.com/${meetupId}`,
  };

  const location =
    community.location === "virtual"
      ? "virtual"
      : `${community.location.country}-${community.location.city}`;
  const filename = slug(`${location}-${community.name}`) + ".json";
  console.log(filename, community);
  await writeFile(
    path.join(__dirname, "/../_data/communities/", filename),
    JSON.stringify(community, null, 2)
  );
};

const run = async () => {
  const baseDir = __dirname + "/../_data/events/";
  const eventFiles = glob(baseDir + "*.json");

  const meetups = {};
  for (let eventFile of eventFiles) {
    const event = JSON.parse(readFileSync(eventFile).toString());
    if (
      !event.url.includes(".meetup.com") &&
      !event.url.includes("//meetup.com")
    ) {
      continue;
    }
    const meetupBaseUrl = event.url
      .replace(/\/events.*/, "")
      .replace(/\/preview\//, "/")
      .replace(/\/..-..\//, "/")
      .replace(/\/$/, "")
      .toLowerCase();

    const meetupId = new URL(meetupBaseUrl).pathname.replace("/", "");
    meetups[meetupId] = meetups[meetupId] || [];
    meetups[meetupId].push(event);
  }

  for (let meetupId in meetups) {
    try {
      await processMeetup(meetupId, meetups[meetupId]);
      await new Promise((r) => setTimeout(r, 100));
    } catch (e) {
      console.error(meetupId, e);
    }
  }
};

run();
