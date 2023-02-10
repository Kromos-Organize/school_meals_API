import {Controller, Delete, Get, Param, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ModerationService} from "../service/moderation.service";
import {ValidateParams} from "../pipes/validateParams.pipe";
import {Moderation} from "../model/moderation.model";
import {MessageDto} from "../dto/message.dto";

@ApiTags('Модерация сотрудников')
@Controller('moderation')
export class ModerationController {

    constructor(private moderationService: ModerationService) { }

    @ApiOperation({summary: 'Получить список ожидающих модерации'})
    @ApiResponse({status: 200, type: [Moderation]})
    // @UseGuards(JwtAdminAuthGuard) //todo проверть почему нет доступа
    @Get('/employee')
    getListModeration() {

        return this.moderationService.getAll();
    }

    @ApiOperation({summary: 'Подтвердить создание админа школы'})
    @ApiResponse({status: 200, type: MessageDto})
    // @UseGuards(JwtAdminAuthGuard)
    @UsePipes(ValidateParams)
    @Get('/employee/:id')
    confirmModeration(@Param('id') id: string){

        return this.moderationService.confirm(id)
    }

    @ApiOperation({summary: 'Удалить админа проходящего модерацию'})
    @ApiResponse({status: 200, type: MessageDto})
    // @UseGuards(JwtAdminAuthGuard)
    @UsePipes(ValidateParams)
    @Delete('/employee/:id')
    cancelModeration(@Param('id') id: string){

        return this.moderationService.remove(id)
    }
}
