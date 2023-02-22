import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post, Put,} from "@nestjs/common";
import {UsersService} from "src/users/application/users.service";
import {User} from "../domain/entities/user.model";
import {UpdateUserDto, UserRegistrationDtoType,} from "../domain/dto/create-user.dto";
import {RoleEnum} from "../domain/entities/role.enum";

@ApiTags("Менеджеры школы")
@Controller("users")
export class UsersController {

  constructor(private managerService: UsersService) {}

  @ApiOperation({ summary: "Получение списка менеджеров" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {

    return this.managerService.getAll();
  }

  @ApiOperation({ summary: "Получение данных менеджера по емейлу" })
  @ApiResponse({ status: 200, type: User })
  @Get(":email")
  get(@Param("email") email: string) {

    return this.managerService.getByEmail(email);
  }

  @ApiOperation({ summary: "Создание менеджера" })
  @ApiResponse({ status: 201, type: User })
  @Post("/create")
  create(@Body() managerDto: any) {

    const inputModel: UserRegistrationDtoType = {
      email: managerDto.email,
      password: managerDto.password,
      phone: managerDto.phone,
      role: RoleEnum.employee,
      isActive: true,
    };

    return this.managerService.createUser(inputModel);
  }

  @ApiOperation({ summary: "Изменение данных менеджера" })
  @ApiResponse({ status: 200, type: User })
  @Put(":manager_id")
  update(@Param("manager_id") manager_id: string,@Body() managerDto: UpdateUserDto) {

    return this.managerService.updateUser(manager_id, managerDto);
  }

  @ApiOperation({ summary: "Удаление менеджера" })
  @ApiResponse({ status: 200, type: '' })
  @Delete(":manager_id")
  remove(@Param("manager_id") manager_id: string) {

    return this.managerService.removeUser(manager_id);
  }
}
