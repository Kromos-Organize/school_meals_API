import {ApiProperty} from "@nestjs/swagger";
import {Column, DataType, Model, Table, Unique} from "sequelize-typescript";
import {IAdminCreationAttrs} from "../dto/admin-service.dto";

@Table({tableName: 'admin', timestamps: false})
export class Admin extends Model<Admin, IAdminCreationAttrs>  {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
    @Unique({name: 'admin_email_unique_key', msg: 'Email must be unique in admin table'})
    @Column({type: DataType.STRING(50), allowNull: false})
    email: string

    @ApiProperty({example:'123456789', description:'Пароль админа'})
    @Column({type: DataType.STRING(100), allowNull: false})
    password: string;

    @ApiProperty({example:'ADMIN', description:'Роль админа'})
    @Column({type: DataType.STRING(10), allowNull: false})
    role: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия админа'})
    @Column({type: DataType.STRING(40), allowNull: false})
    fname: string;

    @ApiProperty({example:'Роман', description:'Имя админа'})
    @Column({type: DataType.STRING(20), allowNull: false})
    name: string;

    @ApiProperty({example:'ТимЛид', description:'Должность админа'})
    @Column({type: DataType.STRING(20), allowNull: false})
    position: string;

    @ApiProperty({example:'80055665444', description:'ID чата с ботом'})
    @Column({type: DataType.STRING(20), allowNull: true})
    chat_number: string;
}