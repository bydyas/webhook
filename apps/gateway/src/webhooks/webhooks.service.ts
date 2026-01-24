import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhooksService {
  constructor() {}

  async forwardMarketingEvents(events: any[]): Promise<boolean> {
    return true;
  }
}
