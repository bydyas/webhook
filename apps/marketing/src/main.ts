import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
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
  );
  const appConfig = app.get(AppConfig);

  const config = new DocumentBuilder()
    .setTitle(appConfig.serviceName)
    .setDescription(appConfig.serviceDescription)
    .setVersion(appConfig.version)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(appConfig.apiPrefix, app, documentFactory);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: appConfig.natsOptions,
  });
  app.enableCors();
  app.setGlobalPrefix(appConfig.apiPrefix);

  await app.startAllMicroservices();
  await app.listen(appConfig.port, appConfig.host);
}

void bootstrap();
