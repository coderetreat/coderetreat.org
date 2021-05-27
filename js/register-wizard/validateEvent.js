import Ajv from "ajv";
import addFormats from "ajv-formats";
import SCHEMA from "../../_data/events/.SCHEMA";

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(SCHEMA);

export default validate;
