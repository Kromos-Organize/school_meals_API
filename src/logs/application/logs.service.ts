import {Injectable} from "@nestjs/common";

@Injectable()
export class LogsService {
    constructor() {
    }

    async getAll() {

        return 'all'
    }

    async getSpecificLog(fileName: string) {

        return fileName
    }

}