import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationAuthException} from "../exception/validationAuth.exception";


@Injectable()
export class ValidationAuth implements PipeTransform<any>{

    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {

        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if(errors.length) {

            let messages = errors.map(error => `${error.property} - ${Object.values(error.constraints).join(', ')}`)
            throw new ValidationAuthException(messages)
        }

        return value;
    }

}