import {Injectable} from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as process from "process";

@Injectable()
export class LogsService {

    private readonly logsDir = './logs'
    private readonly logName = 'query_logs.log'

    async getAll() {

        return fs.readdirSync(path.join(process.cwd(), this.logsDir))
    }

    async getSpecificLog(date: string) {

        const logPath = path.join(process.cwd(), this.logsDir, date, this.logName)

        if (!fs.existsSync(logPath)) return null

        const file = fs.readFileSync(logPath)

        return file.toString()
    }

}