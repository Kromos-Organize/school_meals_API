import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../../users/domain/entities/user.model";
import {addDays}  from 'date-fns';
import {ISessionCreationAttrs} from "../dto/session-service.dto";


@Table({tableName: 'session', timestamps: false})
export class Session extends Model<Session, ISessionCreationAttrs> {

    @ApiProperty({example:'1', description:'ID сессии'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    session_id: number;

    @ApiProperty({example:'1', description:'ID пользователя'})
    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => User)
    user_id: number;

    @ApiProperty({example:'axios/1.3.4', description:'Имя приложения, с которого произошёл логин'})
    @Column({type: DataType.STRING, allowNull: false})
    device_name: string;

    @ApiProperty({example:'google.com', description:'IP адрес / сайт '})
    @Column({type: DataType.STRING, allowNull: false})
    ip: string;

    @ApiProperty({example:'2023-03-22 16:15:54.876', description:'Дата выдачи рефреш-токена / начала сессии'})
    @Column({type: DataType.DATE, allowNull: false, defaultValue: new Date()})
    issued_at: Date;

    @ApiProperty({example:'2023-03-22 16:15:54.876', description:'Дата последнего использования рефреш-токена / авторизации'})
    @Column({type: DataType.DATE, allowNull: false, defaultValue: new Date()})
    last_usage_at: Date;

    @ApiProperty({example:'2023-03-22 16:15:54.876', description:'Дата просрочки рефреш-токена / авторизации'})
    @Column({type: DataType.DATE, allowNull: false, defaultValue: addDays(new Date(), 30)})
    expires_at: Date;

    @ApiProperty({example:'false', description:'Флаг логаута пользователя'})
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    logged_out: boolean;
}