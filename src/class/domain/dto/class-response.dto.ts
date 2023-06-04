import {ApiProperty} from "@nestjs/swagger";

export class ClassDeleteResponseDto {

    @ApiProperty({ example: 11, description: "ID удаленного класса" })
    class_id: number
}