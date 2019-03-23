# Registering an article at coderetreat.org

1. Fork [the Coderetreat git repository](https://github.com/coderetreat/coderetreat.github.io),   current status: [![Build Status](https://travis-ci.org/coderetreat/coderetreat.github.io.svg?branch=master)](https://travis-ci.org/coderetreat/coderetreat.github.io)

2. Create a new file called `YYYY-Author-name.yaml` in the directory `_data/articles/as_a_facilitator/` or `_data/articles/as_an_attendee/` of the repository, according to the point of view of the article: experiences when facilitating a coderetreat or when attending a coderetreat, respectively.
   You can either:
   * Generate a file automatically by using [this schema](https://github.com/coderetreat/coderetreat.github.io/blob/master/articles/article_schema.json).

   * [Take this file content as a template](https://github.com/coderetreat/coderetreat.github.io/blob/master/articles/YYYY-Author-name.yaml)

   The required fields are:
    * `title`
    * `url`
    * `author`
    * `year`
    * `location.city`
    * `location.country`

   For `location.country`, make sure you use the full name of the country. Example below:

    - United Kingdom ✅
    - ~~UK~~
    - United States of America ✅
    - ~~US~~
    - ~~USA~~

3. Run the tests locally before creating the pull request (you must have NodeJS installed on your machine):

   ```sh
   cd coderetreat.github.io/ # Change into the repository
   npm install               # Install all dependencies
   npm test                  # Verify all events
   ```

4. Submit a pull request from Github. Be sure your PR title is clear.

5. Travis-CI will automatically verify that your YAML file is valid (it should show up [here](https://travis-ci.org/coderetreat/coderetreat.github.io/pull_requests) in the test output)

6. The Coderetreat coordinators will then merge your request as soon as possible.

Thanks!
