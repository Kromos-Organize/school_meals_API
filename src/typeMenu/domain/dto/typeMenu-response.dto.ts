import {ApiProperty} from "@nestjs/swagger";

export class TypeMenuDeleteDto {

    @ApiProperty({ example: 11, description: "ID удаленного типа меню" })
    type_id: number
}