import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  sendStatus(response: Response, status: number, json: object) {

    response.status(status).json(json)
  }

  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const responseBody = exception.getResponse();

    switch (status) {

      case 429:
      case 404:
      case 403:
      case 401:
      case 400:

        if (typeof responseBody === 'object') {

          let errorsMessages = []

          for(let param in responseBody as object) {

            if (param === 'message') {

              errorsMessages.push(responseBody[param])
            }
          }

          response.status(status).json({errorResponse: errorsMessages});

        } else {

          this.sendStatus(response, status, {message: responseBody})
        }

        return;

      default:

        this.sendStatus(response, status, {
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        })
    }
  }
}
