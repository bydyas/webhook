import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvGetterService } from 'nestjs-env-getter';
import { version } from 'package.json';

@Injectable()
export class AppConfig {
  readonly port: number;
  readonly host: string;
  readonly serviceName: string;
  readonly serviceDescription: string;
  readonly version: string;
  readonly apiPrefix: string;
  readonly db: TypeOrmModuleOptions;
  readonly isDevelopment: boolean;

  constructor(private readonly envGetter: EnvGetterService) {
    this.isDevelopment =
      this.envGetter.getOptionalEnv('NODE_ENV', 'development') ===
      'development';
    this.port = this.envGetter.getRequiredNumericEnv('PORT');
    this.host = this.envGetter.getOptionalEnv('HOST', '0.0.0.0');
    this.serviceName = this.envGetter.getOptionalEnv(
      'SERVICE_NAME',
      'analytics',
    );
    this.serviceDescription = this.envGetter.getOptionalEnv(
      'SERVICE_DESCRIPTION',
      'API Analytics Service',
    );
    this.version = this.envGetter.getOptionalEnv('VERSION', version);
    this.apiPrefix = this.envGetter.getOptionalEnv('API_PREFIX', 'api');
    this.db = <TypeOrmModuleOptions>{
      host: this.envGetter.getRequiredEnv('DB_HOST'),
      port: this.envGetter.getRequiredNumericEnv('DB_PORT'),
      username: this.envGetter.getRequiredEnv('DB_USERNAME'),
      password: this.envGetter.getRequiredEnv('DB_PASSWORD'),
      database: this.envGetter.getRequiredEnv('DB_NAME'),
      type: this.envGetter.getRequiredEnv('DB_TYPE'),
      autoLoadEntities: true,
      synchronize: false,
      logging: this.isDevelopment ? 'all' : false,
    };
  }
}
