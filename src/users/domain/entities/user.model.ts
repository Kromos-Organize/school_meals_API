import {Column, DataType, ForeignKey, Model, Table,} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {School} from "../../../school/domain/entities/school.model";
import {IUserModelAttr} from "../dto/user-service.dto";

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

  @ApiProperty({ example: "user@mail.ru", description: "Почтовый адрес"})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

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

  @ApiProperty({example: "11231242355", description: "Дата рождения сотрудника, unix time"})
  @Column({ type: DataType.STRING, allowNull: true })
  birthday: string;

  @ApiProperty({ example: "false", description: "Активирован ли пользователь"})
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isActive: boolean;
}
