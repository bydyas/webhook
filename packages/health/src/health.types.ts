import { ModuleMetadata } from '@nestjs/common';

export interface HealthModuleOptions {
  name: string;
}

export interface HealthModuleAsyncOptions extends Pick<
  ModuleMetadata,
  'imports'
> {
  inject?: any[];
  useFactory?: (
    ...args: any[]
  ) => Promise<HealthModuleOptions> | HealthModuleOptions;
}

export interface HealthCheckResult {
  status: string;
  service: string;
  timestamp: string;
}
