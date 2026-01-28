import { LoggerService } from '../logger.service';

export const MockedLogger = {
  log: () => {},
  error: () => {},
  warn: () => {},
  debug: () => {},
  verbose: () => {},
};

export const MockedLoggerServiceProvider = {
  provide: LoggerService,
  useValue: MockedLogger,
};
