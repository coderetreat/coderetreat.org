# Registering your event at coderetreat.org

This year, registering your event at coderetreat.org is easier than it has ever been! Like a lot of other community events, we're using a *Pull Request*-based process for registrations:

1. Fork [the Coderetreat git repository](https://github.com/coderetreat/coderetreat.github.io),   current status: [![Build Status](https://travis-ci.org/coderetreat/coderetreat.github.io.svg?branch=master)](https://travis-ci.org/coderetreat/coderetreat.github.io)


2. Create a new file called `$YOURCITY.json` in the `_data/events_gdcr2018/` of the repository.
   You can either:
   * Generate a file automatically by using [this schema](https://github.com/coderetreat/coderetreat.github.io/blob/master/events/event_schema.json).

   * Generate a valid JSON below:
     <script async src="//jsfiddle.net/wLahmdh4/5/embed/result/"></script>

   The only required fields are:
    * `title`
    * `url`
    * either `location.utcOffset` or `location.timezone` (please note that if you are using `utcOffset`, the offset refers to the event date, so please consider that *Dailight Savings Time* might apply at the time you are submitting your event, but not when the event takes place.)
    * `location.country`
    * `location.city`

   For `location.country`, make sure you use the full name of the country. Example below:

    - United Kingdom ✅
    - ~~UK~~
    - United States of America ✅
    - ~~US~~
    - ~~USA~~

   If you want your event to show up on our map as well, please fill out `location.coordinates` with the coordinates of your city.
   You can find them by typing the city name into Google Maps (or OSM for that matter) and extracting the coordinates from the URL.

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


3. Run the tests locally before creating the pull request:

   ```sh
   cd coderetreat.github.io/ # Change into the repository
   npm install               # Install all dependencies
   npm test                  # Verify all events
   ```


4. Submit a pull request from Github. Be sure your PR title is clear.


5. Travis-CI will automatically verify that your JSON file is valid (it should show up [here](https://travis-ci.org/coderetreat/coderetreat.github.io/pull_requests) in the test output)

   *If you would like to  to run the verification of the JSON file locally, then you must have NodeJS installed on your machine.*



6. The Coderetreat coordinators will then merge your request as soon as possible.
