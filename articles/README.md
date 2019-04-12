# Registering an article at coderetreat.org

1. Fork [the Coderetreat git repository](https://github.com/coderetreat/coderetreat.org),   current status: [![Build Status](https://travis-ci.org/coderetreat/coderetreat.org.svg?branch=master)](https://travis-ci.org/coderetreat/coderetreat.org)

2. Create a new file called `YYYY-Author-name.yaml` in the corresponding directory:
   * `_data/articles/experiences/as-an-attendee/`: the article explains the experience when attending a coderetreat.
   * `_data/articles/experiences/as-a-facilitator/`: the article explains the experience when facilitating a coderetreat.
   * `_data/articles/about-the-format/`: the article talks about the coderetreat format and it's not related to a particular event. In this case, we also include city and country about the author to show the community around the world!

   You can either:
   * Generate a file automatically by using [this schema](https://github.com/coderetreat/coderetreat.org/blob/master/articles/article_schema.json).

   * [Take this file content as a template](https://github.com/coderetreat/coderetreat.org/blob/master/articles/YYYY-Author-name.yaml)

   The required fields are:
    * `title`
    * `url`
    * `author.name`
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
   cd coderetreat.org/ # Change into the repository
   npm install               # Install all dependencies
   npm test                  # Verify all events
   ```

4. Submit a pull request from Github. Be sure your PR title is clear.

5. Travis-CI will automatically verify that your YAML file is valid (it should show up [here](https://travis-ci.org/coderetreat/coderetreat.org/pull_requests) in the test output)

6. The Coderetreat coordinators will then merge your request as soon as possible.

Thanks!
