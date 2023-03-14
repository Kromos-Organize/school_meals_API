import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsNumber, Length} from "class-validator";

export class MenuCreateDto {

    @ApiProperty({example:'12', description:'ID школы'})
    @IsNumber()
    school_id: number;

    @ApiProperty({example:'3', description:'ID типа меню'})
    @IsNumber()
    type_id: number;

    @ApiProperty({example:'56.50', description:'Цена, которую платят родители (платнцая цена)'})
    @IsNumber()
    paid_price: number;

    @ApiProperty({example:'56.50', description:'Цена, которую платит государство (бесплатная цена)'})
    @IsNumber()
    free_price: number;

    @ApiProperty({example:'22.02.2023 08:50', description:'Время добавления меню'})
    @IsDate()
    date: Date;
}

export class UpdateMenuDto {

    @ApiProperty({example:'56.50', description:'Цена, которую платят родители (платнцая цена)'})
    @IsNumber()
    paid_price: number;

    @ApiProperty({example:'56.50', description:'Цена, которую платит государство (бесплатная цена)'})
    @IsNumber()
    free_price: number;

    @ApiProperty({example:'22.02.2023 08:50', description:'Время добавления меню',format:'22.02.2023 08:50'})
    @IsDate()
    date: Date;
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