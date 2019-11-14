const glob = require("glob");
const path = require("path");
const fs = require("fs");
const moment = require("moment-timezone");

const addUtcStart = event => ({
  ...event,
  localeStart: event.date.start,
  utcStart: moment(event.date.start)
    .tz("Europe/Berlin")
    .format()
});

const ignoreVirtualEvents = event => event.location !== "virtual";

const uniq = array => [...new Set(array)];

const pick = keys => obj => keys.reduce((o, k) => ({ ...o, [k]: obj[k] }), {});

const formatModerators = event => ({
  ...event,
  moderators: (event.moderators || []).map(mod => {
    if (typeof mod === "string") return mod;
    if (mod.url && mod.url.includes("twitter.com"))
      return (
        "@" +
        mod.url
          .split("/")
          .slice(-1)[0]
          .replace("@", "")
      );
    return mod.name;
  })
});

const joinHumane = xs => {
  if(xs.length === 0) return "";
  if(xs.length === 1) return xs[0];

  return xs.slice(0, -1).join(", ") + " & " + xs.slice(-1)[0];
}

const flattenCity = event => ({ ...event, city: event.location.city });

const buildTweet = ({ cities, moderators }) =>
  `🌐 Good Morning ${joinHumane(cities)}! Have a great day ${joinHumane(moderators)} #coderetreat #gdcr19`;

const sortByCity = (e1, e2) => {
  const n1 = e1.city.toUpperCase();
  const n2 = e2.city.toUpperCase();

  if (n1 > n2) return 1;
  if (n1 < n2) return -1;
  return 0;
};

const run = () => {
  const events = glob
    .sync(path.resolve(__dirname, "../_data/events_gdcr2019/") + "/*.json")
    .map(file => JSON.parse(fs.readFileSync(file)))
    .filter(ignoreVirtualEvents)
    .map(addUtcStart)
    .map(formatModerators)
    .map(flattenCity)
    .map(pick(["utcStart", "city", "moderators"]));

  const byStartOfEvent = events.reduce((map, event) => {
    map[event.utcStart] = map[event.utcStart] || [];
    map[event.utcStart].push(event);
    return map;
  }, {});

  const allStartTimes = Object.keys(byStartOfEvent).sort();

  for (let startTime of allStartTimes) {
    const events = byStartOfEvent[startTime].slice().sort(sortByCity);

    const tweets = [];

    while (events.length) {
      let nextTweet = { cities: [], moderators: [] };
      while (events.length) {
        const nextEvent = events[0];
        const potentialTweet = {
          cities: uniq(nextTweet.cities.concat(nextEvent.city)),
          moderators: nextTweet.moderators.concat(...nextEvent.moderators)
        };

        const wouldTweetBeTooLong = buildTweet(potentialTweet).length > 280;
        const isSingleEventTooLong =
          buildTweet({
            cities: [nextEvent.city],
            moderators: nextEvent.moderators
          }).length > 280;

        if (wouldTweetBeTooLong && !isSingleEventTooLong) {
          break;
        }

        if (isSingleEventTooLong) {
          events.shift();
          // Same thing just with moderators -.-
          // Let's just assume that one moderator always fits.
          const allModerators = nextEvent.moderators.slice();
          while (allModerators.length) {
            let subsetOfModerators = [];

            while (allModerators.length) {
              const nextModerator = allModerators[0];
              const newLength = buildTweet({
                cities: [nextEvent.city],
                moderators: subsetOfModerators.concat(nextModerator)
              }).length;
              if (newLength > 280) {
                break;
              }
              allModerators.shift();
              subsetOfModerators.push(nextModerator);
            }

            events.push({
              city: nextEvent.city,
              moderators: subsetOfModerators
            });
          }
          break;
        }

        nextTweet = potentialTweet;
        events.shift();
      }
      tweets.push(nextTweet);
    }

    console.log(
      tweets
        .map(buildTweet)
        .map(tweet => `${startTime}: ${tweet}`)
        .join("\n")
    );
  }
};

run();
