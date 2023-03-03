import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsPhoneNumber, IsString, Length} from "class-validator";

export class UpdateUserDto {

    @ApiProperty({ example: 11, description: "ID школы пользователя" })
    readonly school_id?: number;

    @ApiProperty({ example: "Шавлинский", description: "Фамилия пользователя" })
    @Length(3, 20, { message: "Фамилия должна быть от 3 до 20 символов." })
    @IsString({ message: "Должно быть строкой." })
    readonly fname?: string;

    @ApiProperty({ example: "Роман", description: "Имя пользователя" })
    @Length(3, 10, { message: "Имя должно быть от 3 до 10 символов." })
    @IsString({ message: "Должно быть строкой." })
    readonly name?: string;

    @ApiProperty({ example: "Игоревич", description: "Отчество пользователя" })
    @Length(0, 20, { message: "Отчество должно быть от 0 до 20 символов." })
    @IsString({ message: "Должно быть строкой." })
    readonly lname?: string;

    @ApiProperty({ example: "(29)-748-58-75", description: "Телефон пользователя" })
    @IsString({ message: "Должно быть строкой." })
    @IsPhoneNumber("BY", { message: "Код номера должен быть кодом используемым в РБ" })
    readonly phone?: string;

    @ApiProperty({example: "20.20.2022", description: "Дата рождения пользователя"})
    @IsString({ message: "Должно быть строкой." })
    readonly birthday?: Date;
}

export class ActiveUserDto {

    @ApiProperty({ example: true, description: "Aктивация пользователя" })
    @IsBoolean({ message: "Должно быть булевым значением" })
    readonly isActive: boolean;
}