import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNotEmpty} from "class-validator";
import {Transform} from "class-transformer";

export class BlockCabinetRequestDto {

    @ApiProperty({example: 'int', description:'ID пользователя'})
    @Transform(({ value }) => parseInt(value))
    @IsInt({message: 'Айди кабинета должно быть числом'})
    @IsNotEmpty({message: 'Обязательное поле'})
    user_id: number;

    @ApiProperty({example: 'int', description:'ID школы'})
    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty({message: 'Обязательное поле'})
    school_id?: number;
}

export class ParamRemoveCabinet {

    @ApiProperty({example:'int', description:'Айди кабинета'})
    @Transform(({ value }) => parseInt(value))
    @IsInt({message: 'Айди кабинета должна быть числом'})
    @IsNotEmpty({message: 'Обязательное поле'})
    id: number
}

