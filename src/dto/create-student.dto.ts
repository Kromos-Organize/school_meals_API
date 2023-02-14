import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateStudentDto {

    @ApiProperty({example:'12', description:'Айди школы'})
    @IsString({message: 'Должно быть строкой.'})
    readonly school_id: number;

    @ApiProperty({example:'13', description:'Айди класса'})
    @IsString({message: 'Должно быть строкой.'})
    readonly class_id: number;

    @ApiProperty({example:'Шавлинский', description:'Фамилия ученика'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname: string;

    @ApiProperty({example:'Роман', description:'Имя ученика'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string;

    @ApiProperty({example:'Игоревич', description:'Отчество ученика'})
    @IsString({message: 'Должно быть строкой.'})
    readonly lname: string;

    @ApiProperty({example:'{"мама":"375297485875", "папа:375297485875"}', description:'Телефон родителей, JSON.stringify'})
    @IsString({message: 'Должно быть строкой.'})
    readonly phoneParents: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения ученика, unix time'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: string;
}

export class UpdateStudentDto {

    @ApiProperty({example:'Шавлинский', description:'Фамилия ученика'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname: string;

    @ApiProperty({example:'Роман', description:'Имя ученика'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string;

    @ApiProperty({example:'Игоревич', description:'Отчество ученика'})
    @IsString({message: 'Должно быть строкой.'})
    readonly lname: string;

    @ApiProperty({example:'{"мама":"375297485875", "папа:375297485875"}', description:'Телефон родителей, JSON.stringify'})
    @IsString({message: 'Должно быть строкой.'})
    readonly phoneParents: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения ученика, unix time'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: string;
}