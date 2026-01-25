import { Module } from '@nestjs/common';
import { SocialNetworksModule } from './social-networks/social-networks.module';
import { AppConfigModule } from 'nestjs-env-getter';
import { AppConfig } from './app.config';

@Module({
  imports: [
    AppConfigModule.forRoot({ useClass: AppConfig }),
    SocialNetworksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
