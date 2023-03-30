import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {School} from "../../../school/domain/entities/school.model";
import {ClassCategoryEnum, ICreateClass} from "../dto/class-service.dto";
import {Student} from "../../../student/domain/entities/student.model";


@Table({tableName: 'class'})
export class Class extends Model<Class, ICreateClass> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    class_id: number;

    @ApiProperty({example:'1', description:'ID школы'})
    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => School)
    school_id: number;

    @ApiProperty({example:'4', description:'Номер класса'})
    @Column({type: DataType.INTEGER, allowNull: false})
    number: number;

    @ApiProperty({example:'A', description:'Буква класса'})
    @Column({type: DataType.STRING, allowNull: false})
    type: string;

    @ApiProperty({example:'junior', description:'Категория класса(junior - 1-4 классы, elder - 5-11 классы)'})
    @Column({type: DataType.STRING,  allowNull: false, values: [ClassCategoryEnum.elder, ClassCategoryEnum.junior] })
    category: ClassCategoryEnum;

    @BelongsTo(() => Student, 'class_id')
    student: Student;
}