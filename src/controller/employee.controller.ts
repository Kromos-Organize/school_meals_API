import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {EmployeeService} from "../service/employee.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Employee} from "../model/employee.model";
import {CreateEmployeeDto} from "../dto/create-employee.dto";
import {JwtAdminAuthGuard} from "../guard/jwt-admin-auth.guard";

@ApiTags('Сотрудники')
@Controller('employee')
export class EmployeeController {

    // внедрение зависимости, добавление ссылки на сервис
    constructor(private employeeService: EmployeeService) { }

    @ApiOperation({summary: 'Получение списка сотрудников'})
    @ApiResponse({status: 200,type: [Employee]})//[Employee] -> массив пользователей
    @UseGuards(JwtAdminAuthGuard)
    @Get()
    getAll() {
        return this.employeeService.getAllEmployee();
    }

    @ApiOperation({summary: 'Создание сотрудника'})
    @ApiResponse({status: 200,type: Employee})
    @Post()
    create(@Body() employeeDto: CreateEmployeeDto) {
        
        return this.employeeService.createEmployee(employeeDto);
    }
}
