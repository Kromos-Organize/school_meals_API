import {MailerService} from "@nestjs-modules/mailer";
import {Injectable} from "@nestjs/common";

@Injectable()
export class EmailService {

    constructor(private readonly mailerService: MailerService) { }

    async sendRecoveryCode(email: string, code: string) {

        try {

            return this.mailerService.sendMail({
                to: email,
                subject: 'Восстановление пароля',
                template: './recovery-password',
                context: {
                    code: code
                }
            })

        } catch (e) {

            return {error: "message error"}
        }
    }

    async sendModerationMessage(email: string, answer: string) {

        try {

            return this.mailerService.sendMail({
                to: email,
                subject: 'Подтверждение модерации',
                template: './accept-or-reject-moderation',
                context: {
                    answer: answer
                }
            })

        } catch (e) {

            return {error: "message error"}
        }
    }
}