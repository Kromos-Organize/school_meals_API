import {BadRequestException, Injectable} from "@nestjs/common";

type MessagesKeyType = 'yep' | 'not' | 'notAuth' | 'incorrectAuth'
type EntityKeyType = 'auth' | 'admin' | 'user' | 'school' | 'class' | 'student' | 'menu' | 'typeMenu'

type MessageType = {
    [key in MessagesKeyType]: string
}

type EntityType = {
    [key in EntityKeyType]: string
}

@Injectable()
export class BadCheckEntitiesException {

    private messages: MessageType = {
        yep: "существует",
        not: "не существует",
        incorrectAuth: "Неверный логин или пароль.",
        notAuth: "Вы не авторизованы"
    }

    private entity: EntityType = {
        admin: 'Админ',
        auth: '',
        user: 'Пользователь',
        school: 'Школа',
        class: 'Класс',
        student: 'Ученик',
        menu: 'Меню',
        typeMenu: 'Тип меню',
    }

    checkAndGenerateException(value, entityType: EntityKeyType, type: MessagesKeyType, fields: string[]) {

        if (value) {
            throw new BadRequestException({
                message: `${this.entity[entityType]} ${this.messages[type]}`,
                fields,
            });
        }
    }
}