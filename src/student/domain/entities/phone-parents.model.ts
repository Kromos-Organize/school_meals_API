import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {IPhoneParentsModel} from "../dto/student-service.dto";
import {ApiProperty} from "@nestjs/swagger";
import {Student} from "./student.model";

@Table({ tableName: "phone_parents" })
export class PhoneParentsModel extends Model<PhoneParentsModel, IPhoneParentsModel> {

    @ApiProperty({ example: "1", description: "ID номера телефона"})
    @Column({type: DataType.INTEGER,  unique: true, autoIncrement: true, primaryKey: true})
    phone_id: number

    @ApiProperty({ example: "1", description: "ID ученика"})
    @ForeignKey(() => Student)
    @Column({type: DataType.INTEGER, allowNull: false})
    student_id: number
    @BelongsTo(() => Student)
    student: Student

    @ApiProperty({ example: "1", description: "мобильный номер"})
    @Column({type: DataType.INTEGER, allowNull: false})
    m_phone: number

    @ApiProperty({ example: "1", description: "номер"})
    @Column({type: DataType.INTEGER, allowNull: false})
    f_phone: number
}