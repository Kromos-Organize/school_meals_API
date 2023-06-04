import {ApiProperty} from "@nestjs/swagger";

export class SchoolDeleteResponseDto {

    @ApiProperty({ example: 11, description: "ID удаленногй школы" })
    school_id: number
}