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

    checkThrowSchool(value, type: MessagesType, fields: string[]) {

        const usersMessages = {
            'yep': "Школа уже существует",
            'not': "Школа не найдена"
        }

        if (value) {
            throw new BadRequestException({
                message: usersMessages[type],
                fields: fields,
            });
        }
    }

    checkThrowClass(value, type: MessagesType, fields: string[]) {

        const usersMessages = {
            'yep': "Класс уже существует",
            'not': "Класс не найден"
        }

        if (value) {
            throw new BadRequestException({
                message: usersMessages[type],
                fields: fields,
            });
        }
    }

    checkThrowStudent(value, type: MessagesType, fields: string[]) {

        const usersMessages = {
            'yep': "Ученик уже добавлен",
            'not': "Ученик не найден"
        }

        if (value) {
            throw new BadRequestException({
                message: usersMessages[type],
                fields: fields,
            });
        }
    }

    checkThrowMenu(value, type: MessagesType, fields: string[]) {

        const usersMessages = {
            'yep': "Меню уже добавлено",
            'not': "Меню не найдено"
        }

        if (value) {
            throw new BadRequestException({
                message: usersMessages[type],
                fields: fields,
            });
        }
    }
    checkThrowTypeMenu(value, type: MessagesType, fields: string[]) {

        const usersMessages = {
            'yep': "Тип меню уже добавлен",
            'not': "Тип меню не найден"
        }

        if (value) {
            throw new BadRequestException({
                message: usersMessages[type],
                fields: fields,
            });
        }
    }

}