import {ApiProperty} from "@nestjs/swagger";

export class CreateEmployeeDto { // неимеет смысловой нагрузки, служит для передачи данных клиент сервер - сервер сервер

    @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
    readonly email: string;

    @ApiProperty({example:'123456789', description:'Пароль сотрудника'})
    readonly password: string;

    @ApiProperty({example:'375297485875', description:'Телефон сотрудника'})
    readonly phone?: string;

    @ApiProperty({example:'Шавлинский', description:'Фамилия сотрудника'})
    readonly fname?: string;

    @ApiProperty({example:'Роман', description:'Имя сотрудника'})
    readonly name?: string;

    @ApiProperty({example:'Игоревич', description:'Отчество сотрудника'})
    readonly lname?: string;

    @ApiProperty({example:'11231242355', description:'Дата рождения сотрудника, unix time'})
    readonly birthday?: string;

}