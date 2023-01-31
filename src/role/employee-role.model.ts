import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Employee} from "../employee/employee.model";
import {Role} from "./role.model";

@Table({tableName: 'employee_roles', createdAt: false, updatedAt: false})
export class EmployeeRoles extends Model<EmployeeRoles> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Role)//внешний ключ
    @Column({type: DataType.INTEGER})
    role_id: number;

    @ForeignKey(() => Employee)
    @Column({type: DataType.INTEGER})
    employee_id: number;
}
