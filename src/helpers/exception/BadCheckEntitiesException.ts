import {BadRequestException, Injectable} from "@nestjs/common";

type MessagesType = 'yep' | 'not'

@Injectable()
export class BadCheckEntitiesException {

    checkThrowUsers(value, type: MessagesType, field: string) {

        const usersMessages = {
            'yep': "Такой пользователь существует",
            'not': "Такого пользователя не существует"
        }

        if (value) {
            throw new BadRequestException({
                message: usersMessages[type],
                fields: [field],
            });
        }
    }
}