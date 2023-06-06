import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { IPhoneParents } from '../dto/student-service.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from './student.model';

@Table({ tableName: 'phone_parents', timestamps: false })
export class PhoneParents extends Model<PhoneParents, IPhoneParents> {

    @ApiProperty({ example: '1', description: 'ID номера телефона' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    phone_id: number;

    @ApiProperty({ example: '1', description: 'ID ученика' })
    @ForeignKey(() => Student)
    @Column({ type: DataType.INTEGER, allowNull: false })
    student_id: number;

    @BelongsTo(() => Student)
    student: Student;

    @ApiProperty({ example: '(29)748-58-75', description: 'телефон мамы' })
    @Column({ type: DataType.STRING(20), allowNull: true })
    m_phone: string;

    @ApiProperty({ example: '(29)748-58-75', description: 'телефон папы' })
    @Column({ type: DataType.STRING(20), allowNull: true })
    f_phone: string;
}