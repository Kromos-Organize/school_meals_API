import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateRoleDto {

  @ApiProperty({ example: "EMPLOYEE", description: "Название роли" })
  @Length(3, 10, { message: "Название роли должно быть от 3 до 15 символов." })
  @IsString({ message: "Должно быть строкой." })
  readonly type_role: string;

  @ApiProperty({ example: "Сотрудник", description: "Описание роли" })
  @Length(3, 20, { message: "Описание роли должно быть от 3 до 30 символов." })
  @IsString({ message: "Должно быть строкой." })
  readonly description: string;
}

export class UpdateRoleDto {

  @ApiProperty({ example: "Сотрудник", description: "Описание роли" })
  @Length(3, 20, { message: "Описание роли должно быть от 3 до 30 символов." })
  @IsString({ message: "Должно быть строкой." })
  readonly description: string;
}

export enum RoleEnum {
  admin = "ADMIN",
  manager = "MANAGER",
  employee = "EMPLOYEE",
}
