import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { LOGGER_MODULE_OPTIONS } from './logger.token';
import { LoggerModuleAsyncOptions, LoggerModuleOptions } from './logger.types';
import { LoggerService } from './logger.service';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      controllers: [],
      providers: [
        {
          provide: LOGGER_MODULE_OPTIONS,
          useValue: options,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }

  static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    const asyncOptionsProvider: Provider = {
      provide: LOGGER_MODULE_OPTIONS,
      useFactory: options.useFactory!,
      inject: options.inject || [],
    };

    return {
      module: LoggerModule,
      imports: options.imports || [],
      controllers: [],
      providers: [asyncOptionsProvider, LoggerService],
      exports: [LoggerService],
    };
  }
}
