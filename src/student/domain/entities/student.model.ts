import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table,} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import {School} from '../../../school/domain/entities/school.model';
import {StudentCreationAttrs} from '../dto/student-service.dto';
import {PhoneParents} from './phone-parents.model';
import {Meals} from "../../../meals/domain/entity/meals.model";
import {Class} from "../../../class/domain/entity/class.model";

@Table({ tableName: 'student' , updatedAt: false})
export class Student extends Model<Student, StudentCreationAttrs> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    student_id: number;

    @ApiProperty({example:'1', description:'ID школы'})
    @Column({type: DataType.INTEGER, allowNull: true})
    @ForeignKey(() => School)
    school_id: number;

    @ApiProperty({example:'1', description:'ID класса'})
    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Class)
    class_id: number;

    @ApiProperty({example:'Шавлинский', description:'Фамилия ученика'})
    @Column({type: DataType.STRING(40), allowNull: false})
    fname: string;

    @ApiProperty({example:'Роман', description:'Имя ученика'})
    @Column({type: DataType.STRING(20), allowNull: false})
    name: string;

    @ApiProperty({example:'Игоревич', description:'Отчество ученика'})
    @Column({type: DataType.STRING(30), allowNull: true})
    lname: string;

    @ApiProperty({ example: '22.02.2022', description: 'Дата рождения ученика' })
    @Column({ type: DataType.DATEONLY, allowNull: true })
    birthday: Date;

    @ApiProperty({example: false, description: 'Параметр отвечающий многодетная семья или нет',})
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isLargeFamilies: boolean;

    @ApiProperty({example: false, description: 'Питается за счёт бюджета(true) или родителей(false)'})
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isBudget: boolean; //todo возможно надо будет выпилить, не дает гибкости при выборе цены для ученика

    @HasOne(() => PhoneParents)
    phoneParents: PhoneParents;

    @BelongsTo(() => Class, 'class_id')
    class: Class;

    @BelongsTo(()=> Meals, 'student_id')
    meals: Meals
}
