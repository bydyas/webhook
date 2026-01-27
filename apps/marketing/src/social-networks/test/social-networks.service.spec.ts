import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, beforeEach, expect, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockedLoggerProvider } from '@common/logger';
import { SocialNetworksService } from '../social-networks.service';
import { SocialEvent } from '../entities';

describe('SocialNetworksService', () => {
  let service: SocialNetworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialNetworksService,
        {
          provide: getRepositoryToken(SocialEvent),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        MockedLoggerProvider,
      ],
    }).compile();

    service = module.get<SocialNetworksService>(SocialNetworksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
