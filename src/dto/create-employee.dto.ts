import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNumber, IsPhoneNumber, IsString, Length} from "class-validator";

export class CreateEmployeeDto {

    @ApiProperty({example: 2, description:'Айди школы'})
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

    @ApiProperty({example:'(29)748-58-75', description:'Телефон сотрудника школы'})
    @IsPhoneNumber('BY',{message:"Код номера должен быть кодом используемым в РБ"})
    @IsString({message: 'Должно быть строкой.'})
    readonly phone?: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия сотрудника'})
    @Length(3,20,{message: 'Фамилия должна быть от 3 до 20 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname: string;

    @ApiProperty({example:'Роман', description:'Имя сотрудника'})
    @Length(3,10,{message: 'Имя должно быть от 3 до 10 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string;

    @ApiProperty({example:'Игоревич', description:'Отчество сотрудника'})
    @Length(0,20,{message: 'Отчество должно быть от 0 до 20 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly lname?: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения сотрудника, unix time'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: string;
}

export class UpdateEmloyeeDto {

    @ApiProperty({example:'(29)748-58-75', description:'Телефон сотрудника школы'})
    @IsPhoneNumber('BY',{message:"Код номера должен быть кодом используемым в РБ"})
    @IsString({message: 'Должно быть строкой.'})
    readonly phone?: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия сотрудника'})
    @Length(3,20,{message: 'Фамилия должна быть от 3 до 20 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname: string;

    @ApiProperty({example:'Роман', description:'Имя сотрудника'})
    @Length(3,10,{message: 'Имя должно быть от 3 до 10 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string;

    @ApiProperty({example:'Игоревич', description:'Отчество сотрудника'})
    @Length(0,20,{message: 'Отчество должно быть от 0 до 20 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly lname?: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения сотрудника, unix time'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: string;
}
