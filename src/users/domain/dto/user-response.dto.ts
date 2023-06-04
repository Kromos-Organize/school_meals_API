import {ApiProperty} from "@nestjs/swagger";

export class UserResponseDto {

    @ApiProperty({ example: "1", description: "ID пользователя"})
    id: number;

    @ApiProperty({ example: "1", description: "ID школы пользователя"})
    school_id: number;

    @ApiProperty({ example: "EMPLOYEE", description: "Роль пользователя"})
    role: string;

    @ApiProperty({ example: "user@mail.ru", description: "Почтовый адрес"})
    email: string;

    @ApiProperty({ example: "297485875", description: "Телефон пользователя"})
    phone: string;

    @ApiProperty({ example: "Шавлинский", description: "Фамилия пользователя"})
    fname: string;

    @ApiProperty({ example: "Роман", description: "Имя пользователя"})
    name: string;

    @ApiProperty({ example: "Игоревич", description: "Отчество пользователя"})
    lname: string;

    @ApiProperty({example: "20.02.2022", description: "Дата рождения пользователя"})
    birthday: Date;

    @ApiProperty({ example: "false", description: "Активирован ли пользователь"})
    isActive: boolean;
}

export class UserDeleteResponseDto {

    @ApiProperty({ example: 11, description: "ID удаленного пользователя" })
    id: number
}

export class UserActivateResponseDto {

    @ApiProperty({ example: 11, description: "ID пользователя" })
    id: number

    @ApiProperty({ example: true, description: "Значение активации пользователя" })
    isActive: boolean

    @ApiProperty({ example: 'Пользователь активирован', description: "Сообщение об активации" })
    message: string
}

export class CountEmployeeResponseDto {

    @ApiProperty({ example: 30, description: "Количество сотрудников школы" })
    count: number
}

