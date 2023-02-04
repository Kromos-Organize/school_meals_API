import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Employee} from "./employee.model";
import {EmployeeRoles} from "./employee-role.model";

interface RoleCreationAttrs {
    type_role: string,
    description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    role_id: number;

    @ApiProperty({example:'EMPLOYEE', description:'Роль сотрудника'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    type_role: string;

    @ApiProperty({example:'Сотрудник', description:'Описание роли'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    description: string;

    @BelongsToMany(() => Employee, () => EmployeeRoles) //для связывания таблиц многие ко многим
    employee: Employee[]
}
