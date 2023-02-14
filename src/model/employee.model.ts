import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "./role.model";
import {EmployeeRoles} from "./employee-role.model";
import {School} from "./school.model";

interface EmployeeCreationAttrs {
    email: string,
    password: string,
    school_id?: number
    phone?: string,
    fname?: string,
    name?: string,
    lname?: string,
    birthday?: string
}

@Table({tableName: 'employee'})
export class Employee extends Model<Employee, EmployeeCreationAttrs> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    employee_id: number;

    @ApiProperty({example:'1', description:'ID школы'})
    @Column({type: DataType.INTEGER, allowNull: true})
    @ForeignKey(() => School)
    school_id: number;

    @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example:'123456789', description:'Пароль сотрудника'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example:'375297485875', description:'Телефон сотрудника'})
    @Column({type: DataType.STRING, allowNull: true})
    phone: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия сотрудника'})
    @Column({type: DataType.STRING, allowNull: true})
    fname: string;

    @ApiProperty({example:'Роман', description:'Имя сотрудника'})
    @Column({type: DataType.STRING, allowNull: true})
    name: string;

    @ApiProperty({example:'Игоревич', description:'Отчество сотрудника'})
    @Column({type: DataType.STRING, allowNull: true})
    lname: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения сотрудника, unix time'})
    @Column({type: DataType.STRING, allowNull: true})
    birthday: string;
}