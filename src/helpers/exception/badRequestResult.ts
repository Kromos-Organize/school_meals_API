import {ApiProperty} from "@nestjs/swagger";

export class BadRequestResult {
    @ApiProperty({
        example: 'Неверный логин или пароль',
        description: "Краткое сообщение об ошибке"
    })
    message: string

    @ApiProperty({example: ['email', 'password'], description: "Поля, в которых возникла ошибка"})
    fields: string[]


}