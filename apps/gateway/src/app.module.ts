import { Module } from '@nestjs/common';
import { WebhooksModule } from './webhooks/webhooks.module';
import { AppConfigModule } from 'nestjs-env-getter';
import { AppConfig } from './app.config';

@Module({
  imports: [AppConfigModule.forRoot({ useClass: AppConfig }), WebhooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
