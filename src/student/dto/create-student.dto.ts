import {ApiProperty} from "@nestjs/swagger";

export class CreateStudentDto {

    @ApiProperty({example:'Шавлинский', description:'Фамилия ученика'})
    readonly fname: string;

    @ApiProperty({example:'Роман', description:'Имя ученика'})
    readonly name: string;

    @ApiProperty({example:'Игоревич', description:'Отчество ученика'})
    readonly lname: string;

    @ApiProperty({example:'{"мама":"375297485875", "папа:375297485875"}', description:'Телефон родителей, JSON.stringify'})
    readonly phoneParents: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения ученика, unix time'})
    readonly birthday?: string;

}