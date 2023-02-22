import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface SchoolCreationAttrs {
    name:string
    address:string
    city:string
}

@Table({tableName: 'school'})
export class School extends Model<School, SchoolCreationAttrs> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:'Средняя школа №15', description:'Название школы'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example:'ул. Молодежная 15', description:'Адресс школы'})
    @Column({type: DataType.STRING, allowNull: false})
    address: string

    @ApiProperty({example:'Минск', description:'Город в котором находиться школа'})
    @Column({type: DataType.STRING, allowNull: false})
    city: string
}