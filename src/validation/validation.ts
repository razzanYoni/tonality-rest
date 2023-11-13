import {ZodObject} from "zod";
import {ErrorType, StandardError} from "../errors/standard-error";

export const validate = (schema : ZodObject<any>, data : any) => {
    const {error} :any = schema.safeParse(data);
    if (error) {
        console.log(error);
        throw new StandardError(ErrorType.INPUT_DATA_NOT_VALID);
    }
}
