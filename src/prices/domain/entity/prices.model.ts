import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ICreatePrices} from "../dto/prices-service.dto";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'prices'})
export class Prices extends Model<Prices, ICreatePrices>{

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    price_id: number

    @ApiProperty({example:'56.50', description:'Цена, которую платят родители (платнцая цена)'})
    @Column({type: DataType.DECIMAL, allowNull: false})
    paid_price: number

    @ApiProperty({example:'56.50', description:'Цена, которую платит государство (бесплатная цена)'})
    @Column({type: DataType.DECIMAL, allowNull: false})
    free_prices: number
}