import {BadRequestException, Injectable} from "@nestjs/common";

type MessagesKeyType = 'yep' | 'not' | 'notAuth' | 'incorrectAuth' | 'more_class'
type EntityKeyType = 'auth' | 'admin' | 'user' | 'school' | 'class' | 'student' | 'menu' | 'typeMenu' | 'logs' | 'blockCabinet' | 'teacher_class'

type MessageType = {
    [key in MessagesKeyType]: string
}

type EntityType = {
    [key in EntityKeyType]: string
}

@Injectable()
export class BadCheckEntitiesException {

    static readonly messages: MessageType = {
        yep: "существует",
        not: "не существует",
        incorrectAuth: "Неверный логин или пароль.",
        notAuth: "Вы не авторизованы",
        more_class: 'может отвечать только за один класс'
    }

     static readonly entity: EntityType = {
        admin: 'Админ',
        auth: '',
        user: 'Пользователь',
        school: 'Школа',
        class: 'Класс',
        student: 'Ученик',
        menu: 'Меню',
        typeMenu: 'Тип меню',
        logs: 'Файл логов',
        blockCabinet: 'Кабинет',
         teacher_class: 'Учитель'
    }

    static errorMessage(entityType: EntityKeyType, type: MessagesKeyType) {
        return `${BadCheckEntitiesException.entity[entityType]} ${BadCheckEntitiesException.messages[type]}`
    }

    checkAndGenerateException(value, entityType: EntityKeyType, type: MessagesKeyType, fields: string[]) {

        if (value) {
            throw new BadRequestException({
                message: BadCheckEntitiesException.errorMessage(entityType, type),
                fields,
            });
        }
    }
}