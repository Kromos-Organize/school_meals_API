import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateSchoolDto {

    @ApiProperty({example:'Средняя школа №15', description:'Название школы'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string;

    @ApiProperty({example:'ул. Молодежная 15', description:'Адресс школы'})
    @IsString({message: 'Должно быть строкой.'})
    readonly address: string;

    @ApiProperty({example:'Минск', description:'Город в котором находиться школа'})
    @IsString({message: 'Должно быть строкой.'})
    readonly city: string;
}