import { Controller } from '@nestjs/common';
import { SocialNetworksService } from './social-networks.service';
import { ApiTags } from '@nestjs/swagger';
import { EventPattern, Payload } from '@nestjs/microservices';

@ApiTags('Social Networks')
@Controller('')
export class SocialNetworksController {
  constructor(private readonly socialNetworksService: SocialNetworksService) {}

  @EventPattern('marketing.forwarded')
  async ingestEvents(@Payload() event: any): Promise<void> {
    return this.socialNetworksService.ingestEvents(event);
  }
}
