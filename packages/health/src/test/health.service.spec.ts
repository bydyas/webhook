import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, beforeEach, expect } from '@jest/globals';
import { HealthService } from '../health.service';
import { HEALTH_MODULE_OPTIONS } from '../health.token';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: HEALTH_MODULE_OPTIONS,
          useValue: { name: 'test-service' },
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return health check with OK status', () => {
    const result = service.check();
    expect(result.status).toBe('OK');
  });

  it('should return service name from options', () => {
    const result = service.check();
    expect(result.service).toBe('test-service');
  });

  it('should return unknown service name when options.name is not provided', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: HEALTH_MODULE_OPTIONS,
          useValue: {},
        },
      ],
    }).compile();

    const serviceInstance = module.get<HealthService>(HealthService);
    const result = serviceInstance.check();
    expect(result.service).toBe('unknown');
  });

  it('should return valid ISO timestamp', () => {
    const result = service.check();
    expect(() => new Date(result.timestamp)).not.toThrow();
    expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });
});
