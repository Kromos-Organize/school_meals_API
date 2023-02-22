import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from '../app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './exception/exception.filter';

export const createApp = (app: INestApplication): INestApplication => {

  const exceptionFactoryFunc = (errors) => {

    const errorsForResponse = [];

    errors.forEach((e) => {

      const constraintsKeys = Object.keys(e.constraints);

      constraintsKeys.forEach((ckey) => {

        errorsForResponse.push({
          message: e.constraints[ckey],
          fields: e.property,
        });

      });
    });

    throw new BadRequestException(errorsForResponse);
  }

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(cookieParser());
  app.enableCors(
      {
        origin: ['http://localhost:3000','http://dev.schoolmeals.of.by'],
        credentials: true,
      }
  );

  const ValidatePipe = new ValidationPipe({
    transform: true,
    exceptionFactory: exceptionFactoryFunc,
  })

  app.useGlobalPipes(ValidatePipe);
  app.useGlobalFilters(new HttpExceptionFilter());

  return app;
};