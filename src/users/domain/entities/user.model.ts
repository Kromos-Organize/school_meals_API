import {Column, DataType, ForeignKey, HasOne, Model, Table, Unique,} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {School} from "../../../school/domain/entities/school.model";
import {IUserModelAttr} from "../dto/user-service.dto";
import {BlockCabinet} from "../../../block_cabinet/domain/entity/blockCabinet.model";

@Table({ tableName: "user" })
export class User extends Model<User, IUserModelAttr> {

  @ApiProperty({ example: "1", description: "ID пользователя"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({ example: "1", description: "ID школы пользователя"})
  @Column({ type: DataType.INTEGER, allowNull: true })
  @ForeignKey(() => School)
  school_id: number;

  @ApiProperty({ example: "EMPLOYEE", description: "Роль пользователя"})
  @Column({ type: DataType.STRING, allowNull: false })
  role: string;
  
  @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
  @Unique({name: 'user_email_unique_key', msg: 'Email must be unique in admin table'})
  @Column({type: DataType.STRING, allowNull: false})
  email: string

  @ApiProperty({ example: "123456789", description: "Пароль пользователя"})
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "297485875", description: "Телефон пользователя"})
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @ApiProperty({ example: "Шавлинский", description: "Фамилия пользователя"})
  @Column({ type: DataType.STRING, allowNull: true })
  fname: string;

  @ApiProperty({ example: "Роман", description: "Имя пользователя"})
  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @ApiProperty({ example: "Игоревич", description: "Отчество пользователя"})
  @Column({ type: DataType.STRING, allowNull: true })
  lname: string;

  @ApiProperty({example: "22.02.2022", description: "Дата рождения пользователя"})
  @Column({ type: DataType.DATE, allowNull: true })
  birthday: Date;

  @ApiProperty({ example: "false", description: "Активирован ли пользователь"})
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isActive: boolean;

  @HasOne(() => BlockCabinet)
  blockCabinet: BlockCabinet
}
