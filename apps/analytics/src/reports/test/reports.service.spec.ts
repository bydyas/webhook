import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockedLoggerServiceProvider } from '@common/logger';
import { SocialEvent } from '@common/contracts';
import { ReportsService } from '../reports.service';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(SocialEvent),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        MockedLoggerServiceProvider,
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
