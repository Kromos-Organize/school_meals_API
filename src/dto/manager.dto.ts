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

    @ApiProperty({example:'375297485875', description:'Телефон менеджера школы'})
    @IsString({message: 'Должно быть строкой.'})
    readonly phone: string;
}

export class UpdateManagerDto {

    @ApiProperty({example:'297485875', description:'Телефон менеджера'})
    @IsString({message: 'Должно быть строкой.'})
    // @IsPhoneNumber('BY',{message: 'Должен быть правильный формат телефона'})
    readonly phone?: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия менеджера'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname?: string;

    @ApiProperty({example:'Роман', description:'Имя менеджера'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name?: string;

    @ApiProperty({example:'Игоревич', description:'Отчество менеджера'})
    @IsString({message: 'Должно быть строкой.'})
    readonly lname?: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения менеджера, unix time'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: string;

    @ApiProperty({example:'true', description:'Aктивация менеджера'})
    @IsBoolean({message: 'Должно быть булевым значением'})
    readonly isActive?: boolean
}