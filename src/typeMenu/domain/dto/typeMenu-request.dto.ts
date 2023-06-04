import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNotEmpty, IsNumber, Length} from "class-validator";
import {Transform} from "class-transformer";

export class TypeMenuParamDto {

    @ApiProperty({example:'int', description:'Айди типа меню'})
    @Transform(({ value }) => parseInt(value))
    @IsInt({message: 'Айди типа меню должно быть числом'})
    @IsNotEmpty({message: 'Обязательное поле'})
    type_id: number
}

export class TypeMenuDto {

    @ApiProperty({example:'int', description:'Айди школы'})
    @IsInt({message: 'Айди школы должна быть числом'})
    @Transform(({ value }) => +value?.trim())
    @IsNotEmpty({message: 'Обязательное поле'})
    school_id: number
}

export class CreateTypeMenuDto {

    @ApiProperty({example:'12', description:'ID школы'})
    @IsNumber()
    school_id: number

    @ApiProperty({example:'Завтрак', description:'Тип меню'})
    @Length(3,10, {message: 'Длина должна содержать от 3х до 10 символов'})
    type_menu: string
}

export class UpdateTypeMenuDto {

    @ApiProperty({example:'Завтрак', description:'Тип меню'})
    @Length(3,10, {message: 'Длина должна содержать от 3х до 10 символов'})
    type_menu: string
}