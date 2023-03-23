import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ICreateCalcClassSum} from "../dto/calcClassSum-service.dto";
import {Class} from "../../../class/domain/entities/class.model";
import {Prices} from "../../../prices/domain/entity/prices.model";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'calc_class_sum'})
export class CalcClassSum extends Model<CalcClassSum, ICreateCalcClassSum> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ccs_id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Class)
    class_id: number;

    @BelongsTo(() => Class)
    class: Class;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Prices)
    price_id: number;

    @BelongsTo(() => Prices)
    prices: Prices;

    @ApiProperty({example:'22.02.2023', description:'Дата добаления записи'})
    @Column({type: DataType.DATEONLY, allowNull: false})
    date: Date;
}