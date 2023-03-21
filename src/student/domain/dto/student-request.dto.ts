import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";
import {Transform} from "class-transformer";

export class StudentQueryDto {

    @ApiProperty({example:'int', description:'Айди школы'})
    @Transform(({ value }) => parseInt(value))
    @IsInt({message: 'Айди школы должна быть числом'})
    @IsNotEmpty({message: 'Обязательное поле'})
    school_id: number

    @ApiProperty({example:'int', description:'Айди класса'})
    @Transform(({ value }) => parseInt(value))
    @IsInt({message: 'Айди класса должна быть числом'})
    @IsNotEmpty({message: 'Обязательное поле'})
    class_id: number
}

export class StudentParamDto {

    @ApiProperty({example:'int', description:'Айди студента'})
    @IsInt({message: 'Айди студента должно быть числом'})
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({message: 'Обязательное поле'})
    student_id: number
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
        example: '{"мама":"(29)748-58-75", "папа: (29)748-58-75"}',
        description: 'Телефон родителей, JSON.stringify',
    })
    @IsString({ message: 'Должно быть строкой.' })
    readonly phoneParents: string;

    get m_phone(): string {
        return Object.values(JSON.parse(this.phoneParents))[0].toString();
    }

    get f_phone(): string {
        return Object.values(JSON.parse(this.phoneParents))[1].toString();
    }
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

    @ApiProperty({ example: '{"мама":"375297485875", "папа:375297485875"}', description: 'Телефон родителей, JSON.stringify'})
    @IsString({ message: 'Должно быть строкой.' })
    readonly phoneParents: string;

    get m_phone(): string {

        return Object.values(JSON.parse(this.phoneParents))[0].toString();
    }

    get f_phone(): string {

        return Object.values(JSON.parse(this.phoneParents))[1].toString();
    }
}