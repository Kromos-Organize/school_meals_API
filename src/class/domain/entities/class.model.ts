import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {School} from "../../../school/domain/entities/school.model";
import {ICreateClass} from "../dto/class-service.dto";
import {CalcClassMenu} from "../../../calcClassMenu/domain/entity/calcClassMenu.model";

@Table({tableName: 'class'})
export class Class extends Model<Class, ICreateClass> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    class_id: number;

    @ApiProperty({example:'1', description:'ID школы'})
    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => School)
    school_id: number;

    @BelongsTo(() => School)
    school:School

    @ApiProperty({example:'4', description:'Номер класса'})
    @Column({type: DataType.INTEGER, allowNull: false})
    number: number;

    @ApiProperty({example:'A', description:'Буква класса'})
    @Column({type: DataType.STRING, allowNull: false})
    type: string;

    @HasMany(() => CalcClassMenu)
    calcClassMenu: CalcClassMenu
}