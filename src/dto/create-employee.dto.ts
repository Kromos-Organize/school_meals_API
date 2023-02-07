import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsPhoneNumber, IsString, Length} from "class-validator";

export class UpdateEmployeeDto {

    @ApiProperty({example:'375297485875', description:'Телефон сотрудника'})
    @IsString({message: 'Должно быть строкой.'})
    @IsPhoneNumber('BY',{message: 'Должен быть правильный формат телефона'})
    readonly phone?: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия сотрудника'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname?: string;

    @ApiProperty({example:'Роман', description:'Имя сотрудника'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name?: string;

    @ApiProperty({example:'Игоревич', description:'Отчество сотрудника'})
    @IsString({message: 'Должно быть строкой.'})
    readonly lname?: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения сотрудника, unix time'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: string;
}

export class CreateEmployeeDto {

    @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
    @IsString({message: 'Должно быть строкой.'})
    @IsEmail({}, {message:'Некорректынй емейл.'})
    readonly email: string;

    @ApiProperty({example:'123456789', description:'Пароль сотрудника'})
    @IsString({message: 'Должно быть строкой.'})
    @Length(8,16,{message: 'Пароль должен быть от 8 до 16 символов.'})
    readonly password: string;
}
