import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber} from "class-validator";

export class StudentVisitDto {
    @ApiProperty({description: ''})
    @IsNumber()
    student_id: number

    @ApiProperty({description: ''})
    @IsArray({})
    meals: number[]
}