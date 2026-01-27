import { Module } from '@nestjs/common';
import { AppConfigModule } from 'nestjs-env-getter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from '@common/health';
import { LoggerModule } from '@common/logger';
import { SocialNetworksModule } from './social-networks/social-networks.module';
import { AppConfig } from './app.config';

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
