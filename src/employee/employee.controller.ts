import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {EmployeeService} from "./employee.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Employee} from "./employee.model";

@ApiTags('Сотрудники')
@Controller('employee')
export class EmployeeController {

    // внедрение зависимости, добавление ссылки на сервис
    constructor(private employeeService: EmployeeService) { }

    @ApiOperation({summary: 'Получение списка сотрудников'})
    @ApiResponse({status: 200,type: [Employee]})//[Employee] -> массив пользователей
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
