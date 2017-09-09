var expect = require('expect');

const glob = require('glob');
const path = require('path');
const fs   = require('fs');

const YAML = require('yamljs');

const schema = require('../events/event_schema.json');
const JsonValidator = require('jsonschema').Validator;
const moment = require('moment-timezone');

JsonValidator.prototype.customFormats.timezone = (tz) => {
  if(typeof tz === 'undefined') {
    return true;
  }
  if(typeof tz === 'string') {
    return !!moment.tz.zone(tz);
  }
  return false;
}

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

describe('Events as given in /_data/events', () => {
  describe('that are written in JSON: ', () => {
    const jsonFiles = glob.sync(path.resolve(__dirname, '../_data/events/') + '/*.json');

    jsonFiles.forEach(file =>
      it(
        path.basename(file),
        () => validate(JSON.parse(fs.readFileSync(file)))
      )
    );
  });

  describe('that are written in YAML: ', () => {
    const ymlFiles = glob.sync(path.resolve(__dirname, '../_data/events/') + '/*.yml');

    ymlFiles.forEach(file =>
      it(
        path.basename(file),
        () => validate(YAML.load(file))
      )
    );
  });
});

describe('Invalid events given in /test/events', () => {
  describe('that require at least 1 character: ', () => {
    const eventsWithEmptyFields = glob.sync(path.resolve(__dirname, './events/')
      + '/*IsEmpty.json');

    eventsWithEmptyFields.forEach(file =>
      it(path.basename(file) + ' does not validate', () => {
        const result = validationResults(JSON.parse(fs.readFileSync(file)));
        expect(result.errors.length).toBeGreaterThan(0);
      })
    );
  });
});
