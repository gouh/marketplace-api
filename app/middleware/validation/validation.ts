import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";

export * from "class-validator";

/**
 * validate object with a some schema
 * @param schema
 * @param requestObject
 */
export const validationPipe = async (schema: new () => {}, requestObject: object) => {
    const transformedClass: any = plainToInstance(schema, requestObject);
    const errors = await validate(transformedClass);
    let stringErrors = [];
    if (errors.length > 0) {
        for (let i = 0; i < errors.length; i++) {
            let error = errors[i];
            for (const errorKey in error.constraints) {
                stringErrors.push(error.constraints[errorKey])
            }
        }
        return stringErrors;
    }
    return true;
};
