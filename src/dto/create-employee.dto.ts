import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNumber, IsString, Length} from "class-validator";

export class CreateEmployeeDto {

    @ApiProperty({example:'12', description:'Айди школы'})
    @IsNumber()
    readonly school_id: number;

    @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
    @IsString({message: 'Должно быть строкой.'})
    @IsEmail({}, {message:'Некорректынй емейл.'})
    readonly email: string;

    @ApiProperty({example:'123456789', description:'Пароль сотрудника школы'})
    @IsString({message: 'Должно быть строкой.'})
    @Length(8,16,{message: 'Пароль должен быть от 8 до 16 символов.'})
    readonly password: string;

    @ApiProperty({example:'297485875', description:'Телефон сотрудника школы'})
    @IsString({message: 'Должно быть строкой.'})
    readonly phone?: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия сотрудника'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname: string;

    @ApiProperty({example:'Роман', description:'Имя сотрудника'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string;

    @ApiProperty({example:'Игоревич', description:'Отчество сотрудника'})
    @IsString({message: 'Должно быть строкой.'})
    readonly lname?: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения сотрудника, unix time'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: string;
}

export class UpdateEmloyeeDto {

    @ApiProperty({example:'297485875', description:'Телефон сотрудника школы'})
    @IsString({message: 'Должно быть строкой.'})
    readonly phone?: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия сотрудника'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname: string;

    @ApiProperty({example:'Роман', description:'Имя сотрудника'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string;

    @ApiProperty({example:'Игоревич', description:'Отчество сотрудника'})
    @IsString({message: 'Должно быть строкой.'})
    readonly lname?: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения сотрудника, unix time'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: string;
}
