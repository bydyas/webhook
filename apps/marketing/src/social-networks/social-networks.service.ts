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

  /**
   * Ingest a social event into the database
   *
   * Creates a new social event entity from the provided data and persists it to the database.
   * Errors during the save operation are caught and logged to the console.
   *
   * @param event - The social event data to be ingested
   * @returns A promise that resolves when the event has been successfully saved
   */
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
