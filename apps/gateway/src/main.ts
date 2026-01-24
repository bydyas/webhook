import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { AppConfig } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      rawBody: true,
    },
  );
  const appConfig = app.get(AppConfig);

  const config = new DocumentBuilder()
    .setTitle(appConfig.serviceName)
    .setDescription(appConfig.serviceDescription)
    .setVersion(appConfig.version)
    .addTag(appConfig.serviceName)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(appConfig.apiPrefix, app, documentFactory);

  app.enableCors();
  app.useBodyParser('application/json', { bodyLimit: appConfig.bodyLimit });
  app.setGlobalPrefix(appConfig.apiPrefix);

  await app.listen(appConfig.port);
}

void bootstrap();
