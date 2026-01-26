import { DynamicModule, Module, Provider } from '@nestjs/common';
import { HealthModuleAsyncOptions, HealthModuleOptions } from './health.types';
import { HealthService } from './health.service';
import { HEALTH_MODULE_OPTIONS } from './health.token';
import { HealthController } from './heath.contoller';

@Module({})
export class HealthModule {
  static forRoot(options: HealthModuleOptions): DynamicModule {
    return {
      module: HealthModule,
      controllers: [HealthController],
      providers: [
        {
          provide: HEALTH_MODULE_OPTIONS,
          useValue: options,
        },
        HealthService,
      ],
      exports: [HealthService],
    };
  }

  static forRootAsync(options: HealthModuleAsyncOptions): DynamicModule {
    const asyncOptionsProvider: Provider = {
      provide: HEALTH_MODULE_OPTIONS,
      useFactory: options.useFactory!,
      inject: options.inject || [],
    };

    return {
      module: HealthModule,
      imports: options.imports || [],
      controllers: [HealthController],
      providers: [asyncOptionsProvider, HealthService],
      exports: [HealthService],
    };
  }
}
