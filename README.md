# coderetreat.org [![Build Status](https://travis-ci.org/coderetreat/coderetreat.github.io.svg?branch=master)](https://travis-ci.org/coderetreat/coderetreat.github.io)

## Registering your event

If you want to register your event, please fork this repository, copy [this template](https://github.com/coderetreat/coderetreat.github.io/tree/master/_data/events/TEMPLATE), rename it to `$YOURCITY.json` (keep it in `_data/events/` though!) and fill in your details.

The only required fields are `title, url, location.utcOffset, location.country, location.city`.

If you want your event to show up on our map as well, please fill out `location.coordinates` with the coordinates of where your event will take place.

If you send us your Pull Request, Travis will automatically verify that your JSON Payload is valid. You can try it out locally for yourself by running;

```sh
cd coderetreat.github.io/ # Change into the repository
npm install               # Install all dependencies
npm test                  # Verify all events
```

This will validate all registrations in your `_data/events/` folder against the [schema](https://github.com/coderetreat/coderetreat.github.io/blob/master/events/event_schema.json).

### Finding the coordinates of your event

It basically can be as easy as plugging your city name into Google Maps (or OSM for that matter) and extracting the coordinates from the URL.

For Berlin, [Google Maps](https://google.com/maps/) yields the following url:

```
https://www.google.com/maps/@52.5187604,13.4009883,16.3z
                             ^^^^^^^^^^ ^^^^^^^^^^
                             Latitude   Longitude
```

With [OpenStreetMap](https://www.openstreetmap.org), the URL looks like this:
```
https://www.openstreetmap.org/#map=15/52.5188/13.4010
                                      ^^^^^^^ ^^^^^^^
                                      Lat.    Long.
```

## Contributing

TBD
