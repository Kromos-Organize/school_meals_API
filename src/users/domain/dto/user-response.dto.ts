import {ApiProperty} from "@nestjs/swagger";

export class UserDeleteResponseDto {

    @ApiProperty({ example: 11, description: "ID удаленного пользователя" })
    id: number
}

