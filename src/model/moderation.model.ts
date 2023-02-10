import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface ModerationEmployeeAttrs {
    email: string,
    password: string,
}

@Table({tableName:'moderation_employee', createdAt: false, updatedAt: false})
export class Moderation extends Model<Moderation,ModerationEmployeeAttrs>{

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    employee_id: number;

    @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example:'123456789', description:'Пароль сотрудника'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
}