import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {TypeMenu} from "../../../typeMenu/domain/entity/type-menu.model";
import {Student} from "../../../student/domain/entities/student.model";
import {IMealsCreateAttr} from "../dto/meals-service.dto";

@Table({tableName: 'student_meals',timestamps: false})
export class Meals extends Model<Meals, IMealsCreateAttr>{

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:'1', description:'ID ученика'})
    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Student)
    student_id: number;

    @ApiProperty({example:'[2,3,5]', description:'Массив ID типов меню'})
    @Column({type: DataType.ARRAY(DataType.INTEGER), allowNull: false })
    @ForeignKey(() => TypeMenu)
    meals: TypeMenu[];
    
    @ApiProperty({example: false, description: 'Питается за счёт бюджета(true) или родителей(false)'})
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isBudget: boolean;

    @ApiProperty({example:'25/03/2023', description:'Дата визита'})
    @Column({type: DataType.DATEONLY, allowNull: false, defaultValue: new Date()})
    date: Date;

    @BelongsTo(()=> Student, 'student_id')
    student: Student
}