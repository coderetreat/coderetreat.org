var expect = require('expect');

const glob = require('glob');
const path = require('path');
const fs   = require('fs');

const YAML = require('yamljs');

const schema = require('../articles/article_schema.json');
const JsonValidator = require('jsonschema').Validator;

const validationResults = input => {
  return (new JsonValidator).validate(input, schema);
}

const validate = input => {
  const result = validationResults(input);
  if(result.errors.length > 0) {
    console.log(result.errors, JSON.stringify(result.errors));
    throw new Error(result.errors);
  }
}

describe('Articles', () => {
  describe('Articles written by facilitators follow the schema: ', () => {
    const ymlFiles = glob.sync(path.resolve(__dirname, '../_data/articles/experiences/as-a-facilitator/') + '/*.yaml');

    ymlFiles.forEach(file =>
      it(
        path.basename(file),
        () => validate(YAML.load(file))
      )
    );
  });

  describe('Articles written by attendees follow the schema: ', () => {
    const ymlFiles = glob.sync(path.resolve(__dirname, '../_data/articles/experiences/as-an-attendee/') + '/*.yaml');

    ymlFiles.forEach(file =>
      it(
        path.basename(file),
        () => validate(YAML.load(file))
      )
    );
  });

  describe('Articles written about Coderetreat format in general follow the schema: ', () => {
    const ymlFiles = glob.sync(path.resolve(__dirname, '../_data/articles/about-the-format/') + '/*.yaml');

    ymlFiles.forEach(file =>
      it(
        path.basename(file),
        () => validate(YAML.load(file))
      )
    );
  });
});
