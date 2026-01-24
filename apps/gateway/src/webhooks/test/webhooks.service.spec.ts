import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, beforeEach, expect } from '@jest/globals';
import { WebhooksService } from '../webhooks.service';

describe('WebhooksService', () => {
  let service: WebhooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhooksService],
    }).compile();

    service = module.get<WebhooksService>(WebhooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('forwardMarketingEvents', () => {
    it('should return true when called with events array', async () => {
      const events = [{ id: 1, type: 'click' }];
      const result = await service.forwardMarketingEvents(events);
      expect(result).toBe(true);
    });

    it('should return true with empty events array', async () => {
      const result = await service.forwardMarketingEvents([]);
      expect(result).toBe(true);
    });

    it('should return true with multiple events', async () => {
      const events = [
        { id: 1, type: 'click' },
        { id: 2, type: 'impression' },
      ];
      const result = await service.forwardMarketingEvents(events);
      expect(result).toBe(true);
    });
  });
});
