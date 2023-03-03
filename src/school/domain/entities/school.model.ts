import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {ISchoolCreationAttrs} from "../dto/school-service.dto";

@Table({tableName: 'school'})
export class School extends Model<School, ISchoolCreationAttrs> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    school_id: number;

    @ApiProperty({example:'Средняя школа №15', description:'Название школы'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example:'Минская', description:'Область'})
    @Column({type: DataType.STRING, allowNull: false})
    region: string

    @ApiProperty({example:'Минский район', description:'Район'})
    @Column({type: DataType.STRING, allowNull: true})
    area: string

    @ApiProperty({example:'Минск', description:'Город/Посёлок/Деревня'})
    @Column({type: DataType.STRING, allowNull: false})
    city: string

    @ApiProperty({example:'Центральная', description:'Улица'})
    @Column({type: DataType.STRING, allowNull: false})
    street: string

    @ApiProperty({example:'12', description:'Номер здания'})
    @Column({type: DataType.INTEGER, allowNull: false})
    homeNumber: number
}