import {Module} from '@nestjs/common';
import {TelegramBotService} from './telegram_bot.service';
import {AdminModule} from "../admin/admin.module";
import {InlineKeyBoardService} from "./keyBoardReques";

@Module({
    providers: [TelegramBotService,InlineKeyBoardService],
    imports:[
        AdminModule
    ],
    exports: [
        TelegramBotService
    ]
})
export class TelegramBotModule { }
