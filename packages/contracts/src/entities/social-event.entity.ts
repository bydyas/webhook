import { Entity, Column, PrimaryColumn } from 'typeorm';
import { MetadataDto, SocialNetworkEventDto } from '../dto';
import { FacebookEventType, FunnelStage, TiktokEventType } from '../types';

@Entity({ name: 'events' })
export class SocialEvent implements SocialNetworkEventDto {
  @PrimaryColumn({ unique: true })
  eventId: string;

  @Column()
  timestamp: string;

  @Column()
  source: 'facebook' | 'tiktok';

  @Column()
  funnelStage: FunnelStage;

  @Column()
  eventType: FacebookEventType | TiktokEventType;

  @Column({ type: 'jsonb' })
  data: MetadataDto;
}
