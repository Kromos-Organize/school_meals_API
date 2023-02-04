import {ApiProperty} from "@nestjs/swagger";

export class CreateSchoolDto {

    @ApiProperty({example:'Средняя школа №15', description:'Название школы'})
    readonly name: string;

    @ApiProperty({example:'ул. Молодежная 15', description:'Адресс школы'})
    readonly address: string;

    @ApiProperty({example:'Минск', description:'Город в котором находиться школа'})
    readonly city: string;
}