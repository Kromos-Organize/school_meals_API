import {Column, DataType, ForeignKey, Model, Table,} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {School} from "../../../school/domain/entities/school.model";

interface UserCreationsAttr {
  school_id?: number;
  role_id: number;
  email: string;
  password: string;
  phone: string;
  fname?: string;
  name?: string;
  lname?: string;
  birthday?: string;
  isActive?: boolean;
}

@Table({ tableName: "user" })
export class User extends Model<User, UserCreationsAttr> {

  @ApiProperty({ example: "1", description: "ID" })
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({ example: "1", description: "ID школы" })
  @Column({ type: DataType.INTEGER, allowNull: true })
  @ForeignKey(() => School)
  school_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  role: string;

  @ApiProperty({ example: "user@mail.ru", description: "Почтовый адрес" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "123456789", description: "Пароль сотрудника" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "297485875", description: "Телефон сотрудника" })
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @ApiProperty({ example: "Шавлинский", description: "Фамилия сотрудника" })
  @Column({ type: DataType.STRING, allowNull: true })
  fname: string;

  @ApiProperty({ example: "Роман", description: "Имя сотрудника" })
  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @ApiProperty({ example: "Игоревич", description: "Отчество сотрудника" })
  @Column({ type: DataType.STRING, allowNull: true })
  lname: string;

  @ApiProperty({example: "11231242355", description: "Дата рождения сотрудника, unix time"})
  @Column({ type: DataType.STRING, allowNull: true })
  birthday: string;

  @ApiProperty({ example: "false", description: "Активирован ли менеджер" })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isActive: boolean;
}
