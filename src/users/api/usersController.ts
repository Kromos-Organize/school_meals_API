import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "src/users/application/users.service";
import { User } from "../domain/entities/user.model";
import {
  CreateUserDto,
  UpdateUserDto,
  UserRegistrationDtoType,
} from "../domain/dto/create-user.dto";
import { MessageDto } from "../../auth/domain/dto/message.dto";
import { AuthGuard } from "@nestjs/passport";
import { RoleEnum } from "../../role/domain/dto/create-role.dto";

@ApiTags("Менеджеры школы")
@Controller("users")
// @UseGuards(AuthGuard())
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
  create(@Body() managerDto: CreateUserDto) {
    const inputModel: UserRegistrationDtoType = {
      email: managerDto.email,
      password: managerDto.password,
      phone: managerDto.phone,
      role: RoleEnum.employee,
      isActive: true,
    };
    return this.managerService.createManager(inputModel);
  }

  @ApiOperation({ summary: "Изменение данных менеджера" })
  @ApiResponse({ status: 200, type: User })
  @Put(":manager_id")
  update(
    @Param("manager_id") manager_id: string,
    @Body() managerDto: UpdateUserDto
  ) {
    return this.managerService.updateManager(manager_id, managerDto);
  }

  @ApiOperation({ summary: "Удаление менеджера" })
  @ApiResponse({ status: 200, type: MessageDto })
  @Delete(":manager_id")
  remove(@Param("manager_id") manager_id: string) {
    return this.managerService.removeManager(manager_id);
  }
}
