import {Injectable} from '@nestjs/common';
import * as telegramApi from 'node-telegram-bot-api';
import {AdminService} from "../../admin/application/admin.service";

@Injectable()
export class TelegramBotService {

    constructor(private adminService: AdminService) { }

    private bot;

    async createBot() {

        this.bot = new telegramApi(process.env.BOT_TOKEN, {
            polling: {
                interval: 400,
                autoStart: true,
                params: {
                    timeout: 30
                }
            }
        });
    }

    async connectBot() {
        try {

            await this.createBot();
            this.events();

            // this.teamLead = await this.adminService.getAdminByEmail(process.env.TEAM_LEAD_EMAIL);

        }catch (e) {
            console.log('нет конекта с ботом')
        }
    }

    events() {

        this.bot.onText(/\/start/,async (msg) => {
            try {

                console.log(msg)
                await this.bot.sendMessage(msg.chat.id, 'Приветствую.')
            } catch (e) {
                console.log(e)
            }
        })

        this.bot.on("polling_error", (err) => console.log(err));

        this.bot.on('message', async (msg) => {

        })

        this.bot.on("callback_query", async (query) => {

        });
    }
}
