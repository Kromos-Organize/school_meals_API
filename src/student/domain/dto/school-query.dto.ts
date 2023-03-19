import {IsInt, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Transform} from "class-transformer";

export class StudentQueryDto {

    @ApiProperty({example:'int', description:'id школы'})
    @IsInt({message: 'school id should be integer'})
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({message: 'Field is required'})
    school_id: number

    @ApiProperty({example:'int', description:'id класса'})
    @IsInt({message: 'class id should be integer'})
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({message: 'Field is required'})
    class_id: number
}