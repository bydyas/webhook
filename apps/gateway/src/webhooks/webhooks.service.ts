import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class WebhooksService {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  async forwardMarketingEvents(events: any[]): Promise<void> {
    events.forEach((event) => {
      this.natsClient.emit('marketing.forwarded', JSON.stringify(event));
    });
  }
}
