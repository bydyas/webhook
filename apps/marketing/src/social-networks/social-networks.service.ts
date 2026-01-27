import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { SocialNetworkEventDto } from '@common/contracts';
import { LoggerService } from '@common/logger';
import { SocialEvent } from './entities';

@Injectable()
export class SocialNetworksService {
  constructor(
    @InjectRepository(SocialEvent)
    private eventsRepository: Repository<SocialEvent>,
    private readonly logger: LoggerService,
  ) {}

  //#region PUBLIC METHODS

  /**
   * Ingests a social network event.
   * Validates the incoming DTO and persists it to the database.
   * Any validation or persistence errors are caught and logged.
   *
   * @param {SocialNetworkEventDto} event - The incoming event payload to ingest
   * @returns {Promise<void>} Resolves when the event is persisted (or on error)
   */
  async ingestEvents(event: SocialNetworkEventDto): Promise<void> {
    this.logger.log(`Ingesting event: ${event.eventId}.`);

    return this.validateEvent(event)
      .then((ev) => this.persistEvent(ev))
      .catch((error) => this.logger.error(error.message));
  }

  //#endregion PUBLIC METHODS
  //#region PRIVATE METHODS

  /**
   * Persists a validated social network event into the database.
   * Uses the injected TypeORM repository to create and save the entity.
   * Errors during persistence are logged but not re-thrown.
   *
   * @param {SocialNetworkEventDto} event - The validated event to persist
   * @throws {Error} When persistence errors are present
   * @returns {Promise<void>} Resolves after save completes or after logging an error
   */
  private async persistEvent(event: SocialNetworkEventDto): Promise<void> {
    this.logger.debug(`Persisting event: ${event.eventId}.`);

    try {
      const socialEvent = this.eventsRepository.create(event);
      await this.eventsRepository.save(socialEvent);

      return;
    } catch (error) {
      throw new Error(`Persistence failed: ${JSON.stringify(error)}.`);
    }
  }

  /**
   * Validates an incoming event DTO using `class-validator` and `class-transformer`.
   * Converts the plain payload to the DTO instance, applies validation with
   * `whitelist` and `forbidNonWhitelisted` enabled. If validation fails, an Error
   * containing the validation details is thrown.
   *
   * @param {SocialNetworkEventDto} event - Plain event object to validate
   * @throws {Error} When validation errors are present
   * @returns {Promise<SocialNetworkEventDto>} The original event when valid
   */
  private async validateEvent(
    event: SocialNetworkEventDto,
  ): Promise<SocialNetworkEventDto> | never {
    this.logger.debug(`Validating event: ${event.eventId}.`);

    const dtoEvent = plainToInstance(SocialNetworkEventDto, event);
    const errors = await validate(dtoEvent, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${JSON.stringify(errors)}.`);
    }

    return event;
  }

  //#endregion PRIVATE METHODS
}
