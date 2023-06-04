import {BelongsTo, Column, DataType, ForeignKey, Model, Table,} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {IRecoveryData} from "../dto/user-service.dto";
import {User} from "./user.model";

@Table({ tableName: "recovery_data" })
export class RecoveryData extends Model<RecoveryData, IRecoveryData> {

    @ApiProperty({ example: "1", description: "ID пользователя"})
    @Column({type: DataType.INTEGER, primaryKey: true})
    @ForeignKey(() => User)
    user_id: number;

    @BelongsTo(() => User)
    user: User;

    @ApiProperty({ example: "1d0ead90-0d43-4405-9748-bc5680d92458", description: "Код для получения нового пароля"})
    @Column({ type: DataType.STRING, allowNull: false })
    recovery_code: string;

    @ApiProperty({example: "2023-03-29 03:55:16.073 +0700", description: "Дата, когда код станет не действителен"})
    @Column({ type: DataType.DATE, allowNull: true })
    expired_date: Date;

    @ApiProperty({ example: "false", description: "Активирован ли пользователь"})
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    is_confirmed: boolean;
}
