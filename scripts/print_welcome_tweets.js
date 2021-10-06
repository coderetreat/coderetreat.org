#!/usr/bin/env node
require("@js-joda/timezone");
const glob = require("glob").sync;
const { resolve, basename, dirname } = require("path");
const { readFileSync, statSync } = require("fs");
const { ZonedDateTime, DateTimeFormatter } = require("@js-joda/core");
const { Locale } = require("@js-joda/locale_en");

const toWelcomeTweetModerators = (moderators) => {
  if (!moderators) return "";
  const names = moderators.map((mod) => {
    if (typeof mod === "string") return mod;
    if (mod.url && mod.url.includes("twitter.com"))
      return "@" + mod.url.split("/").slice(-1)[0];
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
  "eeee 'at' HH:mm ('UTC'x)"
).withLocale(Locale.US);

glob(__dirname + "/../_data/**/.SCHEMA.json")
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

    for (let eventFile of events) {
      const event = JSON.parse(readFileSync(eventFile).toString());

      const date = ZonedDateTime.parse(event.date.start);
      if(date.isBefore(ZonedDateTime.now())) continue;
      const tweet = `🌐 Welcome ${event.title}${toWelcomeTweetModerators(
        event.moderators
      )} on ${dateFormat.format(date)} to #gdcr21! ${event.url}`;
      console.log(tweet);
    }
    console.log("");
  });
