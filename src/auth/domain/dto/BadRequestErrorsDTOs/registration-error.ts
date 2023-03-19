import {ApiProperty} from "@nestjs/swagger";

export class RegistrationErrorResult {
    @ApiProperty({
        example: 'Пользователь уже существует',
        description: "Краткое сообщение об ошибке"
    })
    message: string

    @ApiProperty({example: ['email'], description: "Поля, в которых возникла ошибка"})
    fields: string[]


}