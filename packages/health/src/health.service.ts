import { Inject, Injectable } from '@nestjs/common';
import { HealthCheckResult, HealthModuleOptions } from './health.types';
import { HEALTH_MODULE_OPTIONS } from './health.token';

@Injectable()
export class HealthService {
  constructor(
    @Inject(HEALTH_MODULE_OPTIONS)
    private readonly options: HealthModuleOptions,
  ) {}

  /**
   * Performs a health check on the service.
   * Returns the current health status, service name, and timestamp.
   *
   * @returns {Object} Health check result containing status, service name, and timestamp
   * @returns {string} status - The health status of the service (currently always 'OK')
   * @returns {string} service - The name of the service from module options or 'unknown'
   * @returns {string} timestamp - ISO 8601 formatted timestamp of the health check
   */
  check(): HealthCheckResult {
    return {
      status: 'OK',
      service: this.options?.name || 'unknown',
      timestamp: new Date().toISOString(),
    };
  }
}
