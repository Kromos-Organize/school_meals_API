import {Module} from '@nestjs/common';
import {TelegramBotService} from '../service/telegram_bot.service';
import {AdminModule} from "./admin.module";
import {InlineKeyBoardService} from "../helper/bot/keyBoardReques";

@Module({
    providers: [TelegramBotService],
    imports:[
        AdminModule
    ],
    exports: [
        TelegramBotService
    ]
})
export class TelegramBotModule { }
