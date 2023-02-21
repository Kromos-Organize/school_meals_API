import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class CreateSchoolDto {

    @ApiProperty({example:'Средняя школа №15', description:'Название школы'})
    @Length(3,20,{message: 'Название школы должно быть от 3 до 30 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string;

    @ApiProperty({example:'ул. Молодежная 15', description:'Адресс школы'})
    @Length(3,20,{message: 'Адресс должен быть от 3 до 20 символов.'})

    @IsString({message: 'Должно быть строкой.'})
    readonly address: string;

    @ApiProperty({example:'Минск', description:'Город в котором находиться школа'})
    @Length(3,20,{message: 'Город должен быть от 3 до 10 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly city: string;
}