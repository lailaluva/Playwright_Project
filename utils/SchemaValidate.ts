import Ajv, {ValidateFunction} from "ajv";
import logger from "./logger";
import fs from "fs";
import path from "path";

const ajv = new Ajv ();

export function validateSchema(schemaFileName: string, responseData: any): boolean{
    const schemaPath = path.join(__dirname, "../schema", `${schemaFileName}`);
    const schemaData = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
    const validate: ValidateFunction = ajv.compile(schemaData);
    const valid = validate(responseData);
    if (!valid) {
        logger.error(`Schema validation failed for ${schemaFileName}`);
         logger.error(JSON.stringify(validate.errors, null, 2));
    }else {
    logger.info(`Schema validation passed for ${schemaFileName}`);
  }
    return valid||false;
}