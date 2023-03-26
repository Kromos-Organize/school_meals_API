import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export interface IMealsCreateAttr {

    student_id: number;
    type_id: number;
    meals: number[];
}

export class VisitDateQueryDto {

    @ApiProperty({example:'2023-03-26', description:'Дата запроса визитов'})
    @IsDate({message: 'Дата должна быть в формате 2023-03-26'})
    @Type(() => Date)
    @IsOptional()
    date: Date
}