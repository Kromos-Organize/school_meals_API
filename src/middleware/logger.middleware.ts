import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);
  use(req: Request, res: Response, next: NextFunction) {

    const { ip, method, originalUrl, body } = req;

    const userAgent = req.get('user-agent' || '')

    res.on('finish', () => {

      const { statusCode } = res;

      const contentLength = res.get('content-length')

      this.logger.log(`Logging HTTP request ${method} ${originalUrl} ${req.body[0]} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,);

      const filePath = path.resolve("./src", "requestLogs");

      if (!fs.existsSync(filePath)) {

        fs.mkdirSync(filePath, { recursive: true });
      }

      const fileName = randomUUID()

      const date = new Date().toLocaleString()

      let logger = fs.createWriteStream(`./src/requestLogs/${fileName}.txt`)

      logger.write(`${date} Logging HTTP request ${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`)
    })
    next();
  }
}