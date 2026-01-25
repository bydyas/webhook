import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialEvent } from './entities';

@Injectable()
export class SocialNetworksService {
  constructor(
    @InjectRepository(SocialEvent)
    private eventsRepository: Repository<SocialEvent>,
  ) {}

  async ingestEvents(event: any): Promise<void> {
    try {
      const socialEvent = this.eventsRepository.create(event);
      await this.eventsRepository.save(socialEvent);

      return;
    } catch (error) {
      console.error(`[${event.eventId}]:${JSON.stringify(error)}.`);
    }
  }
}
