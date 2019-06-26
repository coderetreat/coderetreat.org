# Registering your event at coderetreat.org

This year, registering your event at coderetreat.org is easier than it has ever been! Like a lot of other community events, we're using a *Pull Request*-based process for registrations:

1. Fork [the Coderetreat git repository](https://github.com/coderetreat/coderetreat.org), current status: [![Build Status](https://travis-ci.org/coderetreat/coderetreat.org.svg?branch=master)](https://travis-ci.org/coderetreat/coderetreat.org)


2. Create a new file called `$YOURCITY.json` in the `_data/events_gdcr2019/` of the repository.
   You can either:
   * Generate a file automatically by using [this schema](https://github.com/coderetreat/coderetreat.org/blob/master/events/event_schema2019.json).

   * Generate a file when filling the form below. The file content will appear in **Result** area:
     <script async src="//jsfiddle.net/smx5t2y1/2/embed/result/"></script>

   The only required fields are:
    * `title`
    * `url`
    * `date.start`
    * `date.end`
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

3. If you would like to run the verification of your JSON file locally, then you must have NodeJS installed on your machine to execute the following commands:

   ```sh
   cd coderetreat.org/     # Change into the repository
   npm install             # Install all dependencies
   npm test                # Verify all events
   ```

4. Submit a pull request (PR) from GitHub. Be sure your PR title is clear.

5. Travis-CI will automatically verify that your JSON file is valid (it should show up [here](https://travis-ci.org/coderetreat/coderetreat.org/pull_requests) in the test output).

6. The Coderetreat coordinators will then merge your request as soon as possible.

7. Your event will appear on [Where](/events/) page.
