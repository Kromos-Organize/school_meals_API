import {ApiProperty} from "@nestjs/swagger";

export class AdminDeleteResponseDto {

    @ApiProperty({ example: 11, description: "ID удаленного админа" })
    id: number
}