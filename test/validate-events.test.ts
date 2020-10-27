import { sync as glob } from "glob";
import { resolve, basename, dirname } from "path";
import { readFileSync, readdirSync, statSync, Dirent } from "fs";
import * as Ajv from "ajv";

describe("Events", () => {
  test("jest doesn't complain if there's no test defined here yet", () => {});
  glob(__dirname + "/../_data/**/.SCHEMA.json").forEach((schemaFile) =>
    describe("Events in " + basename(dirname(schemaFile)), () => {
      const events = glob(dirname(schemaFile) + "/*.json");
      const ajv = new Ajv();
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
