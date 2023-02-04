import {ApiProperty} from "@nestjs/swagger";

export class Token {

    @ApiProperty({example:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.........fV0sImlhdCI6MTY3NTI1MzE1NCwiZXhw', description:'Токен аутентификации'})
    token: string
}