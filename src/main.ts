import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { createApp } from "./helpers/createApp";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as path from "path";
import * as process from "process";

const start = async () => {

    const PORT = process.env.PORT || 5000;

    const rawApp = await NestFactory.create<NestExpressApplication>(AppModule);

    rawApp.useStaticAssets(path.join(process.cwd(), 'src/gateway/static'))

    const app = createApp(rawApp);

    const config = new DocumentBuilder() //задает поля для документа
        .setTitle('Школьное питание')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('KromoS')
        .addCookieAuth()
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('/api/docs', app, document);


    await app.listen(PORT, () => {
        console.log('server started on port = ' + PORT);
    })
}

start();