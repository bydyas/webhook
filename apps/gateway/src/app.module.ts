import { Module } from '@nestjs/common';
import { WebhooksModule } from './webhooks/webhooks.module';
import { AppConfigModule } from 'nestjs-env-getter';
import { AppConfig } from './app.config';
import { HealthModule } from '@common/health';
import { LoggerModule } from '@common/logger';

@Module({
  imports: [
    AppConfigModule.forRoot({ useClass: AppConfig }),
    HealthModule.forRootAsync({
      useFactory: ({ serviceName }: AppConfig) => ({
        name: serviceName,
      }),
      inject: [AppConfig],
    }),
    LoggerModule.forRootAsync({
      useFactory: ({ serviceName }: AppConfig) => ({
        name: serviceName,
      }),
      inject: [AppConfig],
    }),
    WebhooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
