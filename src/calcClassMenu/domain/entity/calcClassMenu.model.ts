import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ICreateCalcClassMenu} from "../dto/calcClassMenu-service.dto";
import {Class} from "../../../class/domain/entities/class.model";
import {Menu} from "../../../menu/domain/entity/menu.model";
import {ApiProperty} from "@nestjs/swagger";
import {Prices} from "../../../prices/domain/entity/prices.model";

@Table({tableName: 'calc_class_menu'})
export class CalcClassMenu extends Model<CalcClassMenu, ICreateCalcClassMenu>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    ccm_id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Class)
    class_id: number;

    @BelongsTo(() => Class)
    class: Class;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Menu)
    menu_id: number;

    @BelongsTo(() => Menu)
    menu: Menu;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Prices)
    price_id: number;

    @BelongsTo(() => Prices)
    prices: Prices;

    @ApiProperty({example:'22.02.2023', description:'Дата добаления записи'})
    @Column({type: DataType.DATEONLY, allowNull: false})
    date: Date;
}