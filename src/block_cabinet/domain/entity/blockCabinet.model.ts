import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ICreateBlockCabinet} from "../dto/blockCabinet-service.dto";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../../users/domain/entities/user.model";
import {School} from "../../../school/domain/entities/school.model";

@Table({tableName: 'block_cabinet'})
export class BlockCabinet extends Model<BlockCabinet, ICreateBlockCabinet> {

    @ApiProperty({example:'1', description:'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example:'1', description:'ID пользователя'})
    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => User)
    user_id: number;

    @ApiProperty({example:'1', description:'ID школы'})
    @Column({type: DataType.INTEGER, allowNull: true})
    @ForeignKey(() => School)
    school_id: number;

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => School)
    school: School
}