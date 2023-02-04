import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({example:'EMPLOYEE', description:'Название роли'})
    readonly type_role: string;

    @ApiProperty({example:'Сотрудник', description:'Описание роли'})
    readonly description: string;
}