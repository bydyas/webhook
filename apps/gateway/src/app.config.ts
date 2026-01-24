import { Injectable } from '@nestjs/common';
import { EnvGetterService } from 'nestjs-env-getter';
import { version } from 'package.json';

@Injectable()
export class AppConfig {
  readonly port: number;
  readonly serviceName: string;
  readonly serviceDescription: string;
  readonly version: string;
  readonly apiPrefix: string;
  readonly bodyLimit: number;

  constructor(private readonly envGetter: EnvGetterService) {
    this.port = this.envGetter.getRequiredNumericEnv('PORT');
    this.serviceName = this.envGetter.getOptionalEnv('SERVICE_NAME', 'gateway');
    this.serviceDescription = this.envGetter.getOptionalEnv(
      'SERVICE_DESCRIPTION',
      'API Gateway Service',
    );
    this.version = this.envGetter.getOptionalEnv('VERSION', version);
    this.apiPrefix = this.envGetter.getOptionalEnv('API_PREFIX', 'api');
    this.bodyLimit = this.envGetter.getOptionalNumericEnv(
      'BODY_LIMIT',
      26_214_400,
    ); // 25mb in bytes
  }
}
