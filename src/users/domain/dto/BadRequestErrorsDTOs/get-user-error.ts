import {ApiProperty} from "@nestjs/swagger";

export class GetUserErrorResult {
    @ApiProperty({
        example: 'Пользователя не существует',
        description: "Краткое сообщение об ошибке"
    })
    message: string

    @ApiProperty({example: ['user_id'], description: "Поля, в которых возникла ошибка"})
    fields: string[]


}