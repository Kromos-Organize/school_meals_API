import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length,} from "class-validator";
import { Transform } from 'class-transformer';

export class LoginDto {

  @ApiProperty({ example: "user@mail.ru", description: "Почтовый адрес" })
  @IsString({ message: "Должно быть строкой." })
  @IsEmail({}, { message: "Некорректынй емейл." })
  readonly email: string;

  @ApiProperty({ example: "123456789", description: "Пароль сотрудника" })
  @IsString({ message: "Должно быть строкой." })
  @Length(8, 16, { message: "Пароль должен быть от 8 до 16 символов." })
  readonly password: string;

  @Transform(({ value }) => JSON.parse(value))
  @ApiProperty({ example: true, description: "Заходит ли админ проекта" })
  @IsBoolean({ message: "Должно быть булевым значением" })
  readonly isAdminDev: boolean;
}

export class RegistrationDto {

  @ApiProperty({ example: "user@mail.ru", description: "Почтовый адрес" })
  @IsString({ message: "Должно быть строкой." })
  @IsEmail({}, { message: "Некорректынй емейл." })
  readonly email: string;

  @ApiProperty({ example: "123456789", description: "Пароль менеджера школы" })
  @IsString({ message: "Должно быть строкой." })
  @Length(8, 16, { message: "Пароль должен быть от 8 до 16 символов." })
  readonly password: string;

  @ApiProperty({example: "(29)-748-58-75", description: "Телефон менеджера школы"})
  @IsPhoneNumber("BY", { message: "Код номера должен быть кодом используемым в РБ" })
  @IsString({ message: "Должно быть строкой." })
  readonly phone: string;
}

export class EmailInputDto { 
  
  @ApiProperty({ example: "user@mail.ru", description: "Почтовый адрес" })
  @IsString({ message: "Должно быть строкой." })
  @IsEmail({}, { message: "Некорректынй емейл." })
  readonly email: string;
}

export class NewPasswordDto {

  @ApiProperty({ example: "123456789", description: "Новый пароль" })
  @Length(8, 16, { message: "Пароль должен быть от 8 до 16 символов." })
  @IsString({ message: "Должно быть строкой." })
  @IsNotEmpty({message: 'Обязательное поле'})
  newPassword: string;

  @ApiProperty({ example: "113452ertrte-66456werqer-42558", description: "Код для получения нового пароля"})
  @IsString({ message: "Должно быть строкой." })
  @IsNotEmpty({message: 'Обязательное поле'})
  recoveryCode: string;
}

export class RefreshTokenDto {

  @ApiProperty({ example: "wdqwddefef23qwdqwdqwdqwd", description: "RefreshToken, который был отправлен при логинизации" })
  @IsString({ message: "Должно быть строкой." })
  readonly refreshToken: string;
}