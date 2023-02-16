import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEmail, IsPhoneNumber, IsString, Length} from "class-validator";

export class CreateManagerDto {

    @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
    @IsString({message: 'Должно быть строкой.'})
    @IsEmail({}, {message:'Некорректынй емейл.'})
    readonly email: string;

    @ApiProperty({example:'123456789', description:'Пароль менеджера школы'})
    @IsString({message: 'Должно быть строкой.'})
    @Length(8,16,{message: 'Пароль должен быть от 8 до 16 символов.'})
    readonly password: string;

    @ApiProperty({example:'(29)-748-58-75', description:'Телефон менеджера школы'})
    @IsPhoneNumber('BY',{message:"Код номера должен быть кодом используемым в РБ"})
    @IsString({message: 'Должно быть строкой.'})
    readonly phone: string;
}

export class UpdateManagerDto {

    @ApiProperty({example:'(29)-748-58-75', description:'Телефон менеджера'})
    @IsString({message: 'Должно быть строкой.'})
    @IsPhoneNumber('BY',{message:"Код номера должен быть кодом используемым в РБ"})
    readonly phone?: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия менеджера'})
    @Length(3,20,{message: 'Фамилия должна быть от 3 до 20 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname?: string;

    @ApiProperty({example:'Роман', description:'Имя менеджера'})
    @Length(3,10,{message: 'Имя должно быть от 3 до 10 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name?: string;

    @ApiProperty({example:'Игоревич', description:'Отчество менеджера'})
    @Length(0,20,{message: 'Отчество должно быть от 0 до 20 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly lname?: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения менеджера, unix time'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: string;

    @ApiProperty({example: true, description:'Aктивация менеджера'})
    @IsBoolean({message: 'Должно быть булевым значением'})
    readonly isActive?: boolean
}