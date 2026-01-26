import { Controller } from '@nestjs/common';
import { SocialNetworksService } from './social-networks.service';
import { ApiTags } from '@nestjs/swagger';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NatsEvents } from '@common/contracts';

@ApiTags('Social Networks')
@Controller('')
export class SocialNetworksController {
  constructor(private readonly socialNetworksService: SocialNetworksService) {}

  @EventPattern(NatsEvents.MARKETING_FORWARDED)
  async ingestEvents(@Payload() event: string): Promise<void> {
    const parsedEvent = JSON.parse(event);
    return this.socialNetworksService.ingestEvents(parsedEvent);
  }
}
