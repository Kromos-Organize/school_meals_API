import {Column, DataType, Model, Table} from "sequelize-typescript";
import {TypeMenuCreateAttr} from "../dto/menu-service.dto";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'school'})
export class TypeMenu extends Model<TypeMenu, TypeMenuCreateAttr> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    type_id: number;

    @ApiProperty({example:'Завтрак', description:'Тип меню'})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    type_menu: string;
}