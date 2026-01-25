import { Module } from '@nestjs/common';
import { SocialNetworksModule } from './social-networks/social-networks.module';
import { AppConfigModule } from 'nestjs-env-getter';
import { AppConfig } from './app.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AppConfigModule.forRoot({ useClass: AppConfig }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: AppConfig) => config.db,
      inject: [AppConfig],
    }),
    SocialNetworksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
