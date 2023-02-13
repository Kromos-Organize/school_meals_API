import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from "fs";
import * as moment from "moment";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {

    const now = moment().format('DD-MM-YYYY HH:mm:SS');

    const dirDate = moment().format('DD-MM-YYYY');

    if (!fs.existsSync(`logs/${dirDate}`)) {

      fs.mkdirSync(`logs/${dirDate}`, {recursive: true});

    }

    fs.readFile(`./logs/${dirDate}/query_logs.log`, 'utf-8', (err:Error) => {
      if (err) {

        fs.open(`./logs/${dirDate}/query_logs.log`, 'r+', (err: Error) => {

          if (err) console.log(err)

        })
      }

      const message = `\n[${now}]\nMethod: ${req.method} -- Path: ${req.url} -- Params ${JSON.stringify(req.params)}\nQuery ${JSON.stringify(req.query)}\nBody ${JSON.stringify(req.body)}\nCookies ${JSON.stringify(req.cookies)}\n`

      fs.appendFile(`logs/${dirDate}/query_logs.log`, message, (err: Error) => {

        if (err) throw err;

      })
    })

    next();
  }
}