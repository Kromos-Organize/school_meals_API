import {Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {ITypeMenuCreateAttr} from "../dto/menu-service.dto";
import {ApiProperty} from "@nestjs/swagger";
import {School} from "../../../school/domain/entities/school.model";
import {Menu} from "./menu.model";

@Table({tableName: 'school'})
export class TypeMenu extends Model<TypeMenu, ITypeMenuCreateAttr> {

    @ApiProperty({example: '1', description: 'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    type_id: number;

    @ApiProperty({example:'1', description:'ID школы'})
    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => School)
    school_id: number;

    @ApiProperty({example: 'Завтрак', description: 'Тип меню'})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    type_menu: string;

    @HasOne(() => Menu)
    menu: Menu
}