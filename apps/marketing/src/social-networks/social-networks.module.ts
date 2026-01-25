import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialNetworksController } from './social-networks.controller';
import { SocialNetworksService } from './social-networks.service';
import { SocialEvent } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([SocialEvent])],
  controllers: [SocialNetworksController],
  providers: [SocialNetworksService],
})
export class SocialNetworksModule {}
