import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class WebhooksService {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  /**
   * Forwards events to the marketing service via NATS messaging.
   * Each event is stringified and emitted to the 'marketing.forwarded' channel.
   *
   * @param events - Array of events to forward to the marketing service
   * @returns Promise that resolves when all events have been emitted
   */
  async forwardMarketingEvents(events: any[]): Promise<void> {
    events.forEach((event) => {
      this.natsClient.emit('marketing.forwarded', JSON.stringify(event));
    });
  }
}
