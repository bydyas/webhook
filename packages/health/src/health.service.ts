import { Inject, Injectable } from '@nestjs/common';
import { HealthModuleOptions } from './health.types';
import { HEALTH_MODULE_OPTIONS } from './health.token';

@Injectable()
export class HealthService {
  constructor(
    @Inject(HEALTH_MODULE_OPTIONS)
    private readonly options: HealthModuleOptions,
  ) {}

  check() {
    return {
      status: 'OK',
      service: this.options?.name || 'unknown',
      timestamp: new Date().toISOString(),
    };
  }
}
