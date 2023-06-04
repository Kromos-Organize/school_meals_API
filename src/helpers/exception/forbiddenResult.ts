import {ApiProperty} from "@nestjs/swagger";

export class ForbiddenResult {
    @ApiProperty({
        example: 'Пользователь не активирован',
        description: "Краткое сообщение об ошибке"
    })
    message: string

    @ApiProperty({example: ['isActive'], description: "Поля, в которых возникла ошибка"})
    fields: string[]
}