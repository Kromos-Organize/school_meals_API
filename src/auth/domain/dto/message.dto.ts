import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class MessageDto {

    @ApiProperty({example: 'Какое-то сообщение', description: 'Сообщение'})
    @IsString({message: 'Должно быть строкой.'})
    readonly message: string;
}