import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LogQueryDto {

    @ApiProperty({example:'24-03-2023', description:'Дата запроса логов'})
    @IsString({message: 'Дата должна быть в формате 24-03-2023'})
    date: string
}