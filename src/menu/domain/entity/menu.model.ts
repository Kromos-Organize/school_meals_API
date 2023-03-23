import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {School} from "../../../school/domain/entities/school.model";
import {IMenuCreateAttr} from "../dto/menu-service.dto";
import {TypeMenu} from "../../../typeMenu/domain/entity/type-menu.model";
import {CalcClassMenu} from "../../../calculate/domain/entity/calcClassMenu.model";

@Table({tableName: 'menu'})
export class Menu extends Model<Menu, IMenuCreateAttr> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    menu_id: number;

    @ApiProperty({example:'1', description:'ID школы'})
    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => School)
    school_id: number;

    @BelongsTo(() => School)
    school:School

    @ApiProperty({example:'2', description:'ID типа меню'})
    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => TypeMenu)
    type_id: number;

    @BelongsTo(() => TypeMenu)
    typeMenu: TypeMenu

    @ApiProperty({example:'56.50', description:'Цена, которую платят родители (платнцая цена)'})
    @Column({type: DataType.DECIMAL, allowNull: false})
    paid_price: number;

    @ApiProperty({example:'56.50', description:'Цена, которую платит государство (бесплатная цена)'})
    @Column({type: DataType.DECIMAL, allowNull: false})
    free_price: number;

    @ApiProperty({example:'22.02.2023', description:'Время добавления меню'})
    @Column({type: DataType.DATEONLY, allowNull: false})
    date: Date;

    @HasOne(() => CalcClassMenu)
    calcClassMenu: CalcClassMenu
}