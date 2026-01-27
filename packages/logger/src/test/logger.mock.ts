import { jest } from '@jest/globals';
import { LoggerService } from '../logger.service';

export const MockedLoggerProvider = {
  provide: LoggerService,
  useValue: {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  },
};
