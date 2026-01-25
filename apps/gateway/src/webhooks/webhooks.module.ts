import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppConfig } from '../app.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'NATS_SERVICE',
        useFactory: ({ natsOptions }: AppConfig) => ({
          transport: Transport.NATS,
          options: natsOptions,
        }),
        inject: [AppConfig],
      },
    ]),
  ],
  controllers: [WebhooksController],
  providers: [WebhooksService],
})
export class WebhooksModule {}
