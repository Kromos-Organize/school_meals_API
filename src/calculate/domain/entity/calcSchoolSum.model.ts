import {ICreateCalcSchoolSum} from "../dto/calcSchoolSum-service.dto";
import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Prices} from "../../../prices/domain/entity/prices.model";
import {ApiProperty} from "@nestjs/swagger";
import {School} from "../../../school/domain/entities/school.model";

@Table({tableName: 'calc_school_sum'})
export class CalcSchoolSum extends Model<CalcSchoolSum, ICreateCalcSchoolSum> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    css_id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => School)
    school_id: number;

    @BelongsTo(() => School)
    school: School;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Prices)
    price_id: number;

    @BelongsTo(() => Prices)
    prices: Prices;

    @ApiProperty({example:'22.02.2023', description:'Дата добаления записи'})
    @Column({type: DataType.DATEONLY, allowNull: false})
    date: Date;
}