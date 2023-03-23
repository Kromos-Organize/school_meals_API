import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {ISchoolCreationAttrs} from "../dto/school-service.dto";
import {User} from "../../../users/domain/entities/user.model";
import {Class} from "../../../class/domain/entities/class.model";
import {Student} from "../../../student/domain/entities/student.model";
import {Menu} from "../../../menu/domain/entity/menu.model";
import {TypeMenu} from "../../../typeMenu/domain/entity/type-menu.model";
import {CalcSchoolSum} from "../../../calculate/domain/entity/calcSchoolSum.model";

@Table({tableName: 'school'})
export class School extends Model<School, ISchoolCreationAttrs> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    school_id: number;

    @ApiProperty({example:'Средняя школа №15', description:'Название школы'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example:'Минская', description:'Область'})
    @Column({type: DataType.STRING, allowNull: false})
    region: string

    @ApiProperty({example:'Минский район', description:'Район'})
    @Column({type: DataType.STRING, allowNull: true})
    area: string

    @ApiProperty({example:'Минск', description:'Город/Посёлок/Деревня'})
    @Column({type: DataType.STRING, allowNull: false})
    city: string

    @ApiProperty({example:'Центральная', description:'Улица'})
    @Column({type: DataType.STRING, allowNull: false})
    street: string

    @ApiProperty({example:'12', description:'Номер здания'})
    @Column({type: DataType.INTEGER, allowNull: false})
    homeNumber: number

    @HasMany(() => User)
    user: User

    @HasMany(() => Class)
    class: Class

    @HasMany(() => Student)
    student: Student

    @HasMany(() => Menu)
    menu: Menu

    @HasMany(() => TypeMenu)
    type_menu: TypeMenu

    @HasMany(() => CalcSchoolSum)
    calcSchoolSum: CalcSchoolSum
}