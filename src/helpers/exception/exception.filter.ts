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

        response.sendStatus(404);

        return;

      case 403:
      case 401:

        response.status(401).json({
          field: ['accessToken'],
          message: 'Вы не авторизованы'
        });

        return;

      case 400:

        if (typeof responseBody === 'object') {

          response.status(status).json(responseBody);
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
