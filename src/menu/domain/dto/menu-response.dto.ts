import {ApiProperty} from "@nestjs/swagger";

export class MenuDeleteDto {

    @ApiProperty({ example: 11, description: "ID удаленного меню" })
    menu_id: number
}

export class TypeMenuDeleteDto {

    @ApiProperty({ example: 11, description: "ID удаленного типа меню" })
    type_id: number
}