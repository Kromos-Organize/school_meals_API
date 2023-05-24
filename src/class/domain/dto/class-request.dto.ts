import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNumber, IsString, Max, Min} from "class-validator";
import {PartialType} from "@nestjs/mapped-types";
import {StudentQueryDto} from "../../../student/domain/dto/student-request.dto";
import {ClassCategoryEnum} from "./class-service.dto";


export class ClassQueryDto extends PartialType(StudentQueryDto){}

export class ClassParamDto extends PartialType(StudentQueryDto) {}

export class CreateClassDto {

    @ApiProperty({example:'21', description:'ID школы'})
    @IsNumber()
    readonly school_id: number;

    @ApiProperty({example:'12', description:'ID учителя'})
    @IsNumber()
    readonly user_id: number;

    @ApiProperty({example:'2', description:'Номер класса'})
    @IsNumber()
    @Min(1)
    @Max(11)
    readonly number: number;

    @ApiProperty({example:'Б', description:'Буква класса'})
    @IsString({message: 'Должно быть строкой.'})
    readonly type: string;

    @IsEnum(ClassCategoryEnum)
    get category(): ClassCategoryEnum {
        return [1,2,3,4].includes(this.number) ? ClassCategoryEnum.junior : ClassCategoryEnum.elder
    }

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

    @IsEnum(ClassCategoryEnum)
    get category(): ClassCategoryEnum {
        return [1,2,3,4].includes(this.number) ? ClassCategoryEnum.junior : ClassCategoryEnum.elder
    }
}