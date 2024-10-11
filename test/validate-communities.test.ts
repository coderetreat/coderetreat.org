import Ajv from "ajv";
import addFormats from "ajv-formats";
import { readFileSync } from "fs";
import { sync as glob } from "glob";
import { basename, dirname } from "path";


describe("Communities", () => {
  test("jest doesn't complain if there's no test defined here yet", () => {});
  glob(__dirname + "/../_data/communities/.SCHEMA.json").forEach((schemaFile) =>
    describe("Community in " + basename(dirname(schemaFile)), () => {
      const communities = glob(dirname(schemaFile) + "/*.json");
      const ajv = new Ajv();
      addFormats(ajv);
      const validate = ajv.compile(
        JSON.parse(readFileSync(schemaFile).toString())
      );

      communities.forEach((communityFile) =>
        test(basename(communityFile), () => {
          const result: any = validate(
            JSON.parse(readFileSync(communityFile).toString())
          );
          if (!result) throw validate.errors;
        })
      );
    })
  );
});
