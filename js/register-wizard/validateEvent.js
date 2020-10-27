import Ajv from "ajv";
import SCHEMA from "../../_data/events/.SCHEMA";

const ajv = new Ajv();
const validate = ajv.compile(SCHEMA);




export default validate;
