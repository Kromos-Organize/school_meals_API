import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString, Max, Min} from "class-validator";

export class CreateClassDto {

    @ApiProperty({example:'21', description:'ID школы'})
    @IsNumber()
    readonly school_id: number;

    @ApiProperty({example:'2', description:'Номер класса'})
    @IsNumber()
    @Min(1)
    @Max(11)
    readonly number: number;

    @ApiProperty({example:'Б', description:'Буква класса'})
    @IsString({message: 'Должно быть строкой.'})
    readonly type: string;
}

export class UpdateClassDto {

    @ApiProperty({example:'2', description:'Номер класса'})
    @IsNumber()
    @Min(1)
    @Max(11)
    readonly number: number;

    @ApiProperty({example:'Б', description:'Буква класса'})
    @IsString({message: 'Должно быть строкой.'})
    readonly type: string;
}
