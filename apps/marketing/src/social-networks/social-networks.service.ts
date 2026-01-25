import { Injectable } from '@nestjs/common';

@Injectable()
export class SocialNetworksService {
  constructor() {}

  async ingestEvents(event: any): Promise<void> {
    console.log(JSON.stringify(event));
  }
}
