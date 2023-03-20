import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString, Length} from "class-validator";
import {TypeMenuDto} from "../../../typeMenu/domain/dto/typeMenu-request.dto";

export class SchoolParamDto extends TypeMenuDto {
}

export class SchoolCreateDto {

    @ApiProperty({example:'Средняя школа №15', description:'Название школы'})
    @Length(3,30,{message: 'Название школы должно быть от 3 до 30 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string;

    @ApiProperty({example:'Минская', description:'Область'})
    @Length(3,20,{message: 'Область должена быть от 3 до 20 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly region: string;

    @ApiProperty({example:'Минский район', description:'Район'})
    @Length(3,20,{message: 'Район должен быть от 3 до 20 символов.'})
    readonly area?: string;

    @ApiProperty({example:'Минск', description:'Город/Посёлок/Деревня'})
    @Length(3,20,{message: 'Город должен быть от 3 до 20 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly city: string;

    @ApiProperty({example:'Центральная', description:'Улица'})
    @Length(3,20,{message: 'Улица должена быть от 3 до 20 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly street: string;

    @ApiProperty({example:'12', description:'Номер здания'})
    @IsNumber()
    readonly homeNumber: number;
}

export class SchoolUpdateDto{

    @ApiProperty({example:'Средняя школа №15', description:'Название школы'})
    readonly name?: string;

    @ApiProperty({example:'Минская', description:'Область'})
    readonly region?: string;

    @ApiProperty({example:'Минский район', description:'Район'})
    readonly area?: string;

    @ApiProperty({example:'Минск', description:'Город/Посёлок/Деревня'})
    readonly city?: string;

    @ApiProperty({example:'Центральная', description:'Улица'})
    readonly street?: string;

    @ApiProperty({example:'12', description:'Номер здания'})
    readonly homeNumber?: number;
}