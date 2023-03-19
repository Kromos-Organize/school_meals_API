import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString, Length, ValidateNested} from "class-validator";
import {Transform, Type} from "class-transformer";

export class ParentsPhoneDto {

    @IsString({message: 'Должно быть строкой.'})
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    m_phone: string

    @IsString({message: 'Должно быть строкой.'})
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    f_phone: string

}

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

    @ApiProperty({example:'20.02.2022', description:'Дата рождения ученика'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: Date;

    @ApiProperty({example: false, description: 'Параметр отвечающий многодетная семья или нет'})
    readonly isLargeFamilies?: boolean;

    @ApiProperty({
        example: '{ m_phone: "375297485875", f_phone: "375297485875" }', description: 'Телефон родителей, JSON'})
    @ValidateNested()
    @Type(() => ParentsPhoneDto)
    readonly phoneParents: ParentsPhoneDto;
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

    @ApiProperty({example:'20.02.2022', description:'Дата рождения ученика'})
    @Length(12,13,{message: 'Дата должна быть от 12 до 13 символов.'})
    @IsString({message: 'Должно быть строкой.'})
    readonly birthday?: Date;

    @ApiProperty({example: false, description: 'Параметр отвечающий многодетная семья или нет'})
    readonly isLargeFamilies?: boolean;

    @ApiProperty({ example: '{ m_phone: "375297485875", f_phone: "375297485875" }', description: 'Телефон родителей, JSON'})
    @ValidateNested()
    @Type(() => ParentsPhoneDto)
    readonly phoneParents: ParentsPhoneDto;
}