import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class UpdateEmployeeDto { // неимеет смысловой нагрузки, служит для передачи данных клиент сервер - сервер сервер

    @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
    readonly email: string;

    @ApiProperty({example:'123456789', description:'Пароль сотрудника'})
    readonly password: string;

    @ApiProperty({example:'375297485875', description:'Телефон сотрудника'})
    readonly phone?: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия сотрудника'})
    readonly fname?: string;

    @ApiProperty({example:'Роман', description:'Имя сотрудника'})
    readonly name?: string;

    @ApiProperty({example:'Игоревич', description:'Отчество сотрудника'})
    readonly lname?: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения сотрудника, unix time'})
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
