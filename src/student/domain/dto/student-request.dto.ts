import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString, Length} from "class-validator";

export class StudentRequestDto {

    @ApiProperty({example:12, description:'Айди школы'})
    @IsNumber()
    readonly school_id: number;

    @ApiProperty({example: 13, description:'Айди класса'})
    @IsNumber()
    readonly class_id: number;

    @ApiProperty({example:'Шавлинский', description:'Фамилия ученика'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname: string;

    @ApiProperty({example:'Роман', description:'Имя ученика'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name: string;

    @ApiProperty({example:'Игоревич', description:'Отчество ученика'})
    @IsString({message: 'Должно быть строкой.'})
    readonly lname?: string;

    @ApiProperty({example:'{"мама":"(29)748-58-75", "папа: (29)748-58-75"}', description:'Телефон родителей, JSON.stringify'})
    @IsString({message: 'Должно быть строкой.'})
    readonly phoneParents?: string; // может быть вынести в отдельную таблицу

    @ApiProperty({example:'20.02.2022', description:'Дата рождения ученика'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: Date;

    @ApiProperty({example: false, description: 'Параметр отвечающий многодетная семья или нет'})
    readonly isLargeFamilies?: boolean
}

export class UpdateStudentDto {

    @ApiProperty({example:'Шавлинский', description:'Фамилия ученика'})
    @Length(3,20,{message: 'Фамилия должна быть от 3 до 20 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly fname?: string;

    @ApiProperty({example:'Роман', description:'Имя ученика'})
    @Length(3,10,{message: 'Имя должно быть от 3 до 10 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly name?: string;

    @ApiProperty({example:'Игоревич', description:'Отчество ученика'})
    @Length(0,10,{message: 'Имя должно быть от 0 до 10 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly lname?: string;

    @ApiProperty({example:'{"мама":"375297485875", "папа:375297485875"}', description:'Телефон родителей, JSON.stringify'})
    @IsString({message: 'Должно быть строкой.'})
    readonly phoneParents?: string;

    @ApiProperty({example:'20.02.2022', description:'Дата рождения ученика'})
    @Length(12,13,{message: 'Дата должна быть от 12 до 13 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: Date;

    @ApiProperty({example: false, description: 'Параметр отвечающий многодетная семья или нет'})
    readonly isLargeFamilies?: boolean
}