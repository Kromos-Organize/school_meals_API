import {ApiProperty} from "@nestjs/swagger";

export class CreateAdminDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    readonly email: string;

    @ApiProperty({example: '123456789', description: 'Пароль сотрудника'})
    readonly password: string;

    @ApiProperty({example: 'Шавлинский', description: 'Фамилия админа'})
    readonly fname: string

    @ApiProperty({example: 'Роман', description: 'Имя админа'})
    readonly name: string

    @ApiProperty({example: 'ТимЛид', description: 'Должность админа'})
    readonly position: string

    @ApiProperty({example: '80055665444', description: 'ID чата с ботом'})
    readonly chat_number?: string
}