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
        useFactory: ({ natsQueueName, natsServers }: AppConfig) => ({
          transport: Transport.NATS,
          options: {
            servers: natsServers,
            queue: natsQueueName,
            debug: true,
          },
        }),
        inject: [AppConfig],
      },
    ]),
  ],
  controllers: [WebhooksController],
  providers: [WebhooksService],
})
export class WebhooksModule {}
