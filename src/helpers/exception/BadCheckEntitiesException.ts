import {BadRequestException, Injectable} from "@nestjs/common";

type MessagesType = 'yep' | 'not'

@Injectable()
export class BadCheckEntitiesException {

    checkThrowAuth(value, type: MessagesType, fields: string[]) {

        const usersMessages = {
            'not': "Неверный логин или пароль."
        }

        if (value) {
            throw new BadRequestException({
                message: usersMessages[type],
                fields: fields,
            });
        }
    }

    checkThrowUsers(value, type: MessagesType, fields: string[]) {

        const usersMessages = {
            'yep': "Такой пользователь существует",
            'not': "Такого пользователя не существует"
        }

        if (value) {
            throw new BadRequestException({
                message: usersMessages[type],
                fields: fields,
            });
        }
    }

    checkThrowAdmin(value, type: MessagesType, fields: string[]) {

        const usersMessages = {
            'yep': "Такой админ существует",
            'not': "Такого админа не существует"
        }

        if (value) {
            throw new BadRequestException({
                message: usersMessages[type],
                fields: fields,
            });
        }
    }
}