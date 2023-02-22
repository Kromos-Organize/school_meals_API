import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsPhoneNumber, IsString, Length,} from "class-validator";

export class UpdateUserDto {

  @ApiProperty({ example: "(29)-748-58-75", description: "Телефон менеджера" })
  @IsString({ message: "Должно быть строкой." })
  @IsPhoneNumber("BY", { message: "Код номера должен быть кодом используемым в РБ" })
  readonly phone?: string;

  @ApiProperty({ example: "Шавлинский", description: "Фамилия менеджера" })
  @Length(3, 20, { message: "Фамилия должна быть от 3 до 20 символов." })
  @IsString({ message: "Должно быть строкой." })
  readonly fname?: string;

  @ApiProperty({ example: "Роман", description: "Имя менеджера" })
  @Length(3, 10, { message: "Имя должно быть от 3 до 10 символов." })
  @IsString({ message: "Должно быть строкой." })
  readonly name?: string;

  @ApiProperty({ example: "Игоревич", description: "Отчество менеджера" })
  @Length(0, 20, { message: "Отчество должно быть от 0 до 20 символов." })
  @IsString({ message: "Должно быть строкой." })
  readonly lname?: string;

  @ApiProperty({
    example: "11231242355",
    description: "Дата рождения менеджера, unix time",
  })
  @IsString({ message: "Должно быть строкой." })
  readonly birthday?: string;

  @ApiProperty({ example: true, description: "Aктивация менеджера" })
  @IsBoolean({ message: "Должно быть булевым значением" })
  readonly isActive?: boolean;
}

export class UserRegistrationDtoType {

  school_id?: number;
  role: string;
  email: string;
  password: string;
  phone: string;
  fname?: string;
  name?: string;
  lname?: string;
  birthday?: string;
  isActive?: boolean;
}

// export class UserAllDataDto extends UserRegistrationDtoType {
//   id: number
// }
//
// export class UserRegistrationDtoResponse {
//
//   @ApiProperty({ example: "12", description: "ID пользователя" })
//   id: number
//
//   @ApiProperty({ example: "MANAGER", description: "Роль пользователя" })
//   role: string;
//
//   @ApiProperty({ example: "user@mail.ru", description: "Емейл пользователя" })
//   email: string;
//
//   @ApiProperty({ example: false, description: "Активация пользователя" })
//   isActive: boolean;
// }
