#!/usr/bin/env node
require("@js-joda/timezone");
const glob = require("glob").sync;
const { resolve, basename, dirname } = require("path");
const { readFileSync, statSync } = require("fs");
const { ZonedDateTime, DateTimeFormatter, ZoneId } = require("@js-joda/core");
const { Locale } = require("@js-joda/locale_en");

const toWelcomeTweetModerators = (moderators) => {
  if (!moderators) return "";
  const names = moderators.map((mod) => {
    if (typeof mod === "string") return mod;
    if (mod.url && mod.url.includes("twitter.com"))
      return "@" + mod.url.split("/").slice(-1)[0].replace("@", "");
    return mod.name;
  });
  if (names.length === 0) return "";
  if (names.length === 1) return " with " + names[0];
  return " with " + names.slice(0, -1).join(", ") + " & " + names.slice(-1)[0];
};

const toWelcomeTweet = (event) => {
  const moderators = toWelcomeTweetModerators(event.moderators);
  return `🌐 Welcome ${event.location.city}, ${event.location.country}${moderators} to the Global Day Of Coderetreat 2019! #gdcr19 #coderetreat ${event.url}`;
};

const dateFormat = DateTimeFormatter.ofPattern(
  "yyyy-MM-dd hh:mm a (HH:mm)"
).withLocale(Locale.US);

glob(__dirname + "/../_data/**/.SCHEMA.json")
  .sort()
  .forEach((schemaFile) => {
    console.log(
      "EVENTS FOR",
      dirname(schemaFile),
      "\n--------------------------------"
    );
    const events = glob(dirname(schemaFile) + "/*.json")
      .sort(
        (file_1, file_2) => statSync(file_1).mtimeMs - statSync(file_2).mtimeMs
      )
      .map((eventFile) => JSON.parse(readFileSync(eventFile).toString()))
      .sort((e1, e2) => ZonedDateTime.parse(e1.date.start).compareTo(ZonedDateTime.parse(e2.date.start)));

    for (let event of events) {
      const date = ZonedDateTime.parse(event.date.start).withZoneSameInstant(ZoneId.of("Europe/Berlin"));

      const tweet = `${dateFormat.format(date)} 🌐 Welcome ${event.title.trim()}${toWelcomeTweetModerators(
        event.moderators
      )} to #gdcr2020! Have fun and enjoy the day! #Coderetreat`;
      console.log(tweet);
    }
    console.log("");
  });
