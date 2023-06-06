import {ApiProperty} from "@nestjs/swagger";

export class ClassDeleteResponseDto {

    @ApiProperty({ example: 11, description: "ID удаленного класса" })
    class_id: number
}

export class CountClassesResponseDto {

  @ApiProperty({ example: 20, description: "Количество классов в школе" })
  count: number;
}
