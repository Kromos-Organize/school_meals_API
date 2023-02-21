import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {School} from "../../../school/domain/entities/school.model";
import {Class} from "../../../class/domain/entities/class.model";

interface StudentCreationAttrs {
    school_id: number,
    class_id: number,
    fname: string,
    name: string,
    lname: string,
    phoneParents?: string,
    birthday?: string
}

@Table({tableName: 'student'})
export class Student extends Model<Student, StudentCreationAttrs> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:'1', description:'ID школы'})
    @Column({type: DataType.INTEGER, allowNull: true})
    @ForeignKey(() => School)
    school_id: number;

    @ApiProperty({example:'1', description:'ID класса'})
    @Column({type: DataType.INTEGER, allowNull: true})
    @ForeignKey(() => Class)
    class_id: number;

    @ApiProperty({example:'Шавлинский', description:'Фамилия ученика'})
    @Column({type: DataType.STRING, allowNull: false})
    fname: string;

    @ApiProperty({example:'Роман', description:'Имя ученика'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example:'Игоревич', description:'Отчество ученика'})
    @Column({type: DataType.STRING, allowNull: false})
    lname: string;

    @ApiProperty({example:'{"мама":"375297485875", "папа:375297485875"}', description:'Телефон родителей, JSON.stringify'})
    @Column({type: DataType.STRING, allowNull: true})
    phoneParents: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения ученика, unix time'})
    @Column({type: DataType.STRING, allowNull: true})
    birthday: string;
}
