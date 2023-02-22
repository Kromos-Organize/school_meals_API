import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {School} from "../../../school/domain/entities/school.model";

interface ClassCreationAttrs{
    school_id: number
    number: number
    type: string
}

@Table({tableName: 'class'})
export class Class extends Model<Class,ClassCreationAttrs> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

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
}