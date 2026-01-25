import { Injectable } from '@nestjs/common';
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
  readonly natsServers: string[];
  readonly natsQueueName: string;

  constructor(private readonly envGetter: EnvGetterService) {
    this.port = this.envGetter.getRequiredNumericEnv('PORT');
    this.host = this.envGetter.getOptionalEnv('HOST', '0.0.0.0');
    this.serviceName = this.envGetter.getOptionalEnv(
      'SERVICE_NAME',
      'marketing',
    );
    this.serviceDescription = this.envGetter.getOptionalEnv(
      'SERVICE_DESCRIPTION',
      'API Marketing Service',
    );
    this.version = this.envGetter.getOptionalEnv('VERSION', version);
    this.apiPrefix = this.envGetter.getOptionalEnv('API_PREFIX', 'api');
    this.natsServers = this.envGetter.getRequiredArray(
      'NATS_SERVERS',
      (el) => typeof el === 'string' && new URL(el).protocol === 'nats:',
    );
    this.natsQueueName = this.envGetter.getOptionalEnv(
      'NATS_QUEUE_NAME',
      'marketing-queue',
    );
  }
}
