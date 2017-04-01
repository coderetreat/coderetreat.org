const glob = require('glob');
const path = require('path');
const fs   = require('fs');

const YAML = require('yamljs');

const schema = require('../events/event_schema.json');
const JsonValidator = require('jsonschema').Validator;

const validate = input => {
  const result = (new JsonValidator).validate(input, schema);
  if(result.errors.length > 0) {
    throw new Error(result.errors);
  }
}



describe('Events as given in /_data/events', () => {
  describe('that are written in JSON: ', () => {
    const jsonFiles = glob.sync(path.resolve(__dirname, '../_data/events/')+'/*.json');

    jsonFiles.forEach(file =>
      it(
        path.basename(file),
        () => validate(JSON.parse(fs.readFileSync(file)))
      )
    );
  });

  describe('that are written in YAML: ', () => {
    const ymlFiles = glob.sync(path.resolve(__dirname, '../_data/events/')+'/*.yml');

    ymlFiles.forEach(file =>
      it(
        path.basename(file),
        () => validate(YAML.load(file))
      )
    );
  });
});
