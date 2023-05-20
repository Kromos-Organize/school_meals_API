import {Controller, Get, HttpCode, Query, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {LogsService} from "../application/logs.service";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {LogQueryDto} from "../domain/dto/logQueryDto";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Логи запросов')
@ApiBearerAuth()
@ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
@UseGuards(AuthGuard())
@Controller('logs')
export class LogsController {
    constructor(private logsService: LogsService,
                private badException: BadCheckEntitiesException
                ) {
    }

    @ApiOperation({summary: 'Получение списка логов'})
    @ApiResponse({ status: 200, type: [String], description: 'Успешное получение списка логов (массив дат)' })
    @HttpCode(200)
    @Get()
    async getAllLogs() {

        return await this.logsService.getAll()
    }

    @ApiOperation({summary: 'Получение лога по имени файла'})
    @ApiResponse({status: 200, type: '', description: 'Успешное получение файла логов'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('logs', 'not')})
    @HttpCode(200)
    @Get('/log')
    async getDailyLog(@Query() query: LogQueryDto) {

        const logfile = await this.logsService.getSpecificLog(query.date)

        this.badException.checkAndGenerateException(!logfile, 'logs', 'not', ['fileName']);

        return logfile
    }
}