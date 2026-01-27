import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { MockedLoggerProvider } from '@common/logger';
import { WebhooksService } from '../webhooks.service';

describe('WebhooksService', () => {
  let service: WebhooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhooksService,
        {
          provide: 'NATS_SERVICE',
          useValue: {
            emit: jest.fn(),
          },
        },
        MockedLoggerProvider,
      ],
    }).compile();

    service = module.get<WebhooksService>(WebhooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
