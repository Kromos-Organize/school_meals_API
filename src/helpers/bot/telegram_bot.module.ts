import {Module} from '@nestjs/common';
import {TelegramBotService} from './telegram_bot.service';
import {AdminModule} from "../../admin/admin.module";

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
