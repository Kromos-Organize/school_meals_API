import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsNumber, Length} from "class-validator";

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