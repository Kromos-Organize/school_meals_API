import {ApiProperty} from "@nestjs/swagger";
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Role} from "../../../role/domain/entities/role.model";

interface AdminCreationAttrs {
    role_id: number
    email: string
    password: string
    fname: string
    name: string
    position: string
    chat_number?: string
}

@Table({tableName: 'admin'})
export class Admin extends Model<Admin, AdminCreationAttrs>  {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Role)
    role_id: number

    @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example:'123456789', description:'Пароль админа'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия админа'})
    @Column({type: DataType.STRING, allowNull: false})
    fname: string;

    @ApiProperty({example:'Роман', description:'Имя админа'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example:'ТимЛид', description:'Должность админа'})
    @Column({type: DataType.STRING, allowNull: false})
    position: string;

    @ApiProperty({example:'80055665444', description:'ID чата с ботом'})
    @Column({type: DataType.STRING, allowNull: true})
    chat_number: string;
}