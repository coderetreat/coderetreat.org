import Ajv from "ajv";
import addFormats from "ajv-formats";
import { readFileSync } from "fs";
import { sync as glob } from "glob";
import { basename, dirname } from "path";


describe("Events", () => {
  test("jest doesn't complain if there's no test defined here yet", () => {});
  glob(__dirname + "/../_data/events/.SCHEMA.json").forEach((schemaFile) =>
    describe("Events in " + basename(dirname(schemaFile)), () => {
      const events = glob(dirname(schemaFile) + "/*.json");
      const ajv = new Ajv();
      addFormats(ajv);
      const validate = ajv.compile(
        JSON.parse(readFileSync(schemaFile).toString())
      );

      events.forEach((eventFile) =>
        test(basename(eventFile), () => {
          const result: any = validate(
            JSON.parse(readFileSync(eventFile).toString())
          );
          if (!result) throw validate.errors;
        })
      );
    })
  );
});
