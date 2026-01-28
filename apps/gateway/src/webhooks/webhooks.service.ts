import { NatsEvents, SocialNetworkEventDto } from '@common/contracts';
import { LoggerService } from '@common/logger';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class WebhooksService {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Forwards events to the marketing service via NATS messaging.
   * Each event is stringified and emitted to the 'marketing.forwarded' channel.
   *
   * @param events - Array of events to forward to the marketing service
   * @returns Promise that resolves when all events have been emitted
   */
  async forwardMarketingEvents(
    events: SocialNetworkEventDto[],
  ): Promise<boolean> {
    /* TODO: Consider switching to NATS JetStream to send larger msgs and persist them.
     * It needs some time to research and implement custom jetsream module
     * as current library @nestjs/microservices does not support it out of the box.
     * ! Current implementation sends events individually, which may not be optimal for high volumes !
     */
    this.logger.log(`Forwarding ${events.length} events to marketing service.`);

    events.forEach((event) => {
      this.natsClient.emit(
        NatsEvents.MARKETING_FORWARDED,
        JSON.stringify(event),
      );
    });

    return true;
  }
}
