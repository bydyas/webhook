import { Module } from '@nestjs/common';
import { SocialNetworksController } from './social-networks.controller';
import { SocialNetworksService } from './social-networks.service';

@Module({
  imports: [],
  controllers: [SocialNetworksController],
  providers: [SocialNetworksService],
})
export class SocialNetworksModule {}
