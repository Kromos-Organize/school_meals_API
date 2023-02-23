import {ApiProperty} from "@nestjs/swagger";
import {Column, DataType, Model, Table} from "sequelize-typescript";
import {IAdminCreationAttrs} from "../dto/admin-service.dto";

@Table({tableName: 'admin'})
export class Admin extends Model<Admin, IAdminCreationAttrs>  {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example:'123456789', description:'Пароль админа'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example:'ADMIN', description:'Роль админа'})
    @Column({type: DataType.STRING, allowNull: false})
    role: string;

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