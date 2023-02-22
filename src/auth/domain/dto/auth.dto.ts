import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  Length,
} from "class-validator";

export class TokenDto {

  @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.........",description: "Токен аутентификации"})
  accessToken: string;
}

export class LoginDto {

  @ApiProperty({ example: "user@mail.ru", description: "Почтовый адрес" })
  @IsString({ message: "Должно быть строкой." })
  @IsEmail({}, { message: "Некорректынй емейл." })
  readonly email: string;

  @ApiProperty({ example: "123456789", description: "Пароль сотрудника" })
  @IsString({ message: "Должно быть строкой." })
  @Length(8, 16, { message: "Пароль должен быть от 8 до 16 символов." })
  readonly password: string;

  @ApiProperty({ example: true, description: "Заходит ли админ проекта" })
  @IsBoolean({ message: "Должно быть булевым значением" })
  readonly isAdminDev: boolean;
}

export class UserDto {

  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly role_id?: number;

  @IsNumber()
  readonly role?: string;

  @IsString({ message: "Должно быть строкой." })
  @IsEmail({}, { message: "Некорректынй емейл." })
  readonly email: string;

  @IsString({ message: "Должно быть строкой." })
  @Length(8, 16, { message: "Пароль должен быть от 8 до 16 символов." })
  readonly password: string;
}
