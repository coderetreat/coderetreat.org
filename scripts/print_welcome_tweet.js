const fs = require("fs");
const path = require("path");
const glob = require("glob");
const DIR = "_data/events_gdcr2019";

const toWelcomeTweetModerators = moderators => {
  if(!moderators) return "";
  const names = moderators.map(mod => {
    if (typeof mod === "string") return mod;
    if (mod.url && mod.url.includes("twitter.com"))
      return "@" + mod.url.split("/").slice(-1)[0];
    return mod.name;
  });
  if (names.length === 0) return "";
  if (names.length === 1) return " with " + names[0];
  return " with " + names.slice(0, -1).join(", ") + " & " + names.slice(-1)[0];
};

const toWelcomeTweet = event => {
  const moderators = toWelcomeTweetModerators(event.moderators);
  return `🌐 Welcome ${event.location.city}, ${
    event.location.country
  }${moderators} to the Global Day Of Coderetreat 2019! #gdcr19 #coderetreat ${
    event.url
  }`;
};

const events = glob
  .sync(path.resolve(__dirname, "../_data/events_gdcr2019/") + "/*.json")
  .sort((fa, fb) => fs.statSync(fa).mtimeMs - fs.statSync(fb).mtimeMs)
  .map(file => JSON.parse(fs.readFileSync(file)))
  .map(toWelcomeTweet);

console.log(events.join("\n"));
