import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {ValidationException} from "../exception/validationException";

@Injectable()
export class ValidateParams implements PipeTransform<any>{

    private regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    private regexId = /^[0-9]*$/;
    private regexRole = /^[A-Za-z]+$/;

    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {

        switch (metadata.data) {

            case 'email': {

                if (!this.regexEmail.test(value)) {

                    throw new ValidationException(`${metadata.data} - не валидный емейл`)
                }
                break;
            }

            case 'id': {

                if (!this.regexId.test(value)) {
                    throw new ValidationException(`${metadata.data} - не правильный id, не должен быть отрицательный или иметь буквы.`)
                }
                break;
            }

            case 'type_role': {

                if (!this.regexRole.test(value)) {
                    throw new ValidationException(`${metadata.data} - роль не должна содержать цифр.`)
                }
                break;
            }
            default:
                return value
        }
    }

}