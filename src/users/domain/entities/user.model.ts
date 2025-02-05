import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table, Unique,} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {School} from "../../../school/domain/entities/school.model";
import {IUserModelAttr} from "../dto/user-service.dto";
import {BlockCabinet} from "../../../block_cabinet/domain/entity/blockCabinet.model";
import {RecoveryData} from "./recovery-data.model";
import { Class } from 'src/class/domain/entity/class.model';

@Table({ tableName: "user", updatedAt: false })
export class User extends Model<User, IUserModelAttr> {

  @ApiProperty({ example: "1", description: "ID пользователя"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({ example: "1", description: "ID школы пользователя"})
  @Column({ type: DataType.INTEGER, allowNull: true })
  @ForeignKey(() => School)
  school_id: number;

  @ApiProperty({ example: "EMPLOYEE", description: "Роль пользователя"})
  @Column({ type: DataType.STRING(10), allowNull: false })
  role: string;
  
  @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
  @Unique({name: 'user_email_unique_key', msg: 'Email must be unique in admin table'})
  @Column({type: DataType.STRING(50), allowNull: false})
  email: string

  @ApiProperty({ example: "123456789", description: "Пароль пользователя"})
  @Column({ type: DataType.STRING(100), allowNull: false })
  password: string;

  @ApiProperty({ example: "297485875", description: "Телефон пользователя"})
  @Column({ type: DataType.STRING(20), allowNull: false })
  phone: string;

  @ApiProperty({ example: "Шавлинский", description: "Фамилия пользователя"})
  @Column({ type: DataType.STRING(40), allowNull: true })
  fname: string;

  @ApiProperty({ example: "Роман", description: "Имя пользователя"})
  @Column({ type: DataType.STRING(20), allowNull: true })
  name: string;

  @ApiProperty({ example: "Игоревич", description: "Отчество пользователя"})
  @Column({ type: DataType.STRING(30), allowNull: true })
  lname: string;

  @ApiProperty({ example: "2021-07-06", description: "Дата рождения пользователя" })
  @Column({ type: DataType.DATEONLY, allowNull: true })
  birthday: Date;

  @ApiProperty({ example: "false", description: "Активирован ли пользователь"})
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isActive: boolean;

  @HasOne(() => BlockCabinet)
  blockCabinet: BlockCabinet

  @HasOne(() => RecoveryData)
  recoveryData: RecoveryData;

  @BelongsTo(() => School, 'school_id')
  school: School;

  @HasOne(() => Class)
  class: Class
}
