var fs = require('fs');
var groupBy = require('lodash.groupby');
var mergeWith = require('lodash.mergewith');
var isEqual = require('lodash.isequal');
var values = require('lodash.values');

var eventsJson = JSON.parse(fs.readFileSync('gdcr13.json', 'utf8'));
var eventsGroupedByName = groupBy(eventsJson, 'name');

var mergedEvents = values(eventsGroupedByName).map(events => {
  var head = events[0];
  var tail = events.slice(1);

  return tail.reduce(function(sum, value) {
    return mergeWith(sum, value, function(objValue, srcValue) {
      if (objValue === srcValue)
        return objValue;

      if (Array.isArray(objValue) && isEqual(objValue, srcValue)) {
        return objValue;
      }

      if (Array.isArray(objValue)) {
        return objValue.concat([srcValue]);
      }

      return [objValue, srcValue];
    });
  }, head);
});

var strippedDown = mergedEvents.map(event => {
  return {
    timeZone: event.timeZone,
    offset: event.offset,
    country: event.country,
    urls: Array.isArray(event.url) ? event.url : [event.url],
    name: event.name,
    coords: event.coords,
    city: event.city
  }
})

fs.writeFileSync('gdcr13-stripped.json', JSON.stringify(strippedDown), 'utf8')
