import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateAdminDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @IsString({message: 'Должно быть строкой.'})
    @IsEmail({}, {message:'Некорректынй емейл.'})
    readonly email: string;

    @ApiProperty({example: '123456789', description: 'Пароль сотрудника'})
    @IsString({message: 'Должно быть строкой.'})
    @Length(8,16,{message: 'Пароль должен быть от 8 до 16 символов.'})
    readonly password: string;

    @ApiProperty({example: 'Шавлинский', description: 'Фамилия админа'})
    @Length(3,20,{message: 'Фамилия должна быть от 3 до 20 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname: string

    @ApiProperty({example: 'Роман', description: 'Имя админа'})
    @Length(3,10,{message: 'Имя должно быть от 3 до 10 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string

    @ApiProperty({example: 'ТимЛид', description: 'Должность админа'})
    @Length(3,10,{message: 'Должность должна быть от 3 до 10 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly position: string

    @ApiProperty({example: '80055665444', description: 'ID чата с ботом'})
    @IsString({message: 'Должно быть строкой.'})
    readonly chat_number?: string
}

export class UpdateAdminDto {

    @ApiProperty({example: 'Шавлинский', description: 'Фамилия админа'})
    @Length(3,20,{message: 'Фамилия должна быть от 3 до 20 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname: string

    @ApiProperty({example: 'Роман', description: 'Имя админа'})
    @Length(3,10,{message: 'Имя должна быть от 3 до 10 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string

    @ApiProperty({example: 'ТимЛид', description: 'Должность админа'})
    @Length(3,10,{message: 'Должность должна быть от 3 до 10 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly position: string

    @ApiProperty({example: '80055665444', description: 'ID чата с ботом'})
    @IsString({message: 'Должно быть строкой.'})
    readonly chat_number?: string
}