import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateRoleDto {

    @ApiProperty({example:'EMPLOYEE', description:'Название роли'})
    @IsString({message: 'Должно быть строкой.'})
    readonly type_role: string;

    @ApiProperty({example:'Сотрудник', description:'Описание роли'})
    @IsString({message: 'Должно быть строкой.'})
    readonly description: string;
}