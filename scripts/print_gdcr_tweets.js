const glob = require("glob");
const path = require("path");
const fs = require("fs");
const moment = require("moment-timezone");

const UTC_START = moment("2018-11-17T09:00:00Z");

const addStartOfEvent = event => {
  const { utcOffset, timezone } = event.location;

  let startOfEvent;
  if (timezone) {
    startOfEvent = moment.tz("2018-11-17T09:00:00", timezone).format();
  } else {
    startOfEvent = moment("2018-11-17T09:00:00").utcOffset(utcOffset*60, true).format();
  }
  return {
    ...event,
    startOfEvent
  };
};

const events = glob
  .sync(path.resolve(__dirname, "../_data/events_gdcr2018/") + "/*.json")
  .map(file => JSON.parse(fs.readFileSync(file)))
  .filter(event => !!event.location.utcOffset || !!event.location.timezone)
  .map(addStartOfEvent);

const byStartOfEvent = events.reduce((map, event) => {
  map[event.startOfEvent] = map[event.startOfEvent] || [];
  map[event.startOfEvent].push(event);
  return map;
}, {});

let tweetData = [];

const lengthOfList = arr => (arr.length-1)*2+arr.reduce((sum, str) => sum+str.length, 0);

for(let start in byStartOfEvent) {
  let currentCities = [];
  let currentModerators = [];

  for(let event of byStartOfEvent[start]) {
    const moderators = event.moderators.filter(mod => mod[0] === '@');
    if(moderators.length === 0) continue;

    const currentLength = 54+lengthOfList(currentCities)+lengthOfList(currentModerators);
    if(currentLength + event.location.city.length + lengthOfList(moderators) > 280) {
        tweetData.push({start, cities: currentCities, moderators: currentModerators });
        currentCities = [];
        currentModerators = [];
    }

    if(!currentCities.includes(event.location.city)) {
      currentCities.push(event.location.city);
    }
    currentModerators = currentModerators.concat(moderators);
  }
  if(currentCities.length === 0) continue;
  tweetData.push({start, cities: currentCities, moderators: currentModerators });
}

const buildTweet = ({start, cities, moderators}) => `${start}: 🌐 Good Morning ${cities.join(", ")}! Have a great day ${moderators.join(", ")} #coderetreat #gdcr18`;

console.log(tweetData.map(buildTweet).sort().join("\n"));
