import {ApiProperty} from "@nestjs/swagger";

export class AdminResponse {

    @ApiProperty({example:'1', description:'ID'})
    id: number;

    @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
    email: string

    @ApiProperty({example:'ADMIN', description:'Роль админа'})
    role: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия админа'})
    fname: string;

    @ApiProperty({example:'Роман', description:'Имя админа'})
    name: string;

    @ApiProperty({example:'ТимЛид', description:'Должность админа'})
    position: string;

    @ApiProperty({example:'80055665444', description:'ID чата с ботом'})
    chat_number: string;
}

export class AdminDeleteResponseDto {

    @ApiProperty({ example: 11, description: "ID удаленного админа" })
    id: number
}



