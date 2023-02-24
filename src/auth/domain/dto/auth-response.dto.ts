import {ApiProperty} from "@nestjs/swagger";

export class LoginResponseDto {

    @ApiProperty({ example: 12, description: "ID пользователя"})
    id: number

    @ApiProperty({ example: 10, description: "ID школы пользователя"})
    school_id: number | null;

    @ApiProperty({ example: "MANAGER", description: "Роль пользователя"})
    role: string;

    @ApiProperty({ example: "user@mail.ru", description: "Емейл пользователя"})
    email: string;

    @ApiProperty({ example: "(29)-222-22-22", description: "Телефон пользователя"})
    phone: string;

    @ApiProperty({ example: "Шавлинский", description: "Фамилия пользователя"})
    fname?: string | null;

    @ApiProperty({ example: "Роман", description: "Имя пользователя"})
    name?:  string | null;

    @ApiProperty({ example: "Игоревич", description: "Отчество пользователя"})
    lname?:  string | null;

    @ApiProperty({ example: "1123313123", description: "День рождение пользователя в unix формате"})
    birthday?:  string | null;

    @ApiProperty({ example: false, description: "Aктивация пользователя"})
    isActive?: boolean;

    @ApiProperty({ example: 'wdqdwqdqwdqwd12319283y912dw', description: "Токен авторизации"})
    accessToken: string
}

export class RegisterResponseDto {

    @ApiProperty({ example: 12, description: "ID пользователя"})
    id: number

    @ApiProperty({ example: "user@mail.ru", description: "Емейл пользователя"})
    email: string;

    @ApiProperty({ example: "MANAGER", description: "Роль пользователя"})
    role: string;

    @ApiProperty({ example: false, description: "Aктивация пользователя"})
    isActive?: boolean;
}

export class RefreshTokenResponseDto {

    @ApiProperty({ example: 'wdqdwqdqwdqwd12319283y912dw', description: "Токен авторизации"})
    accessToken: string
}