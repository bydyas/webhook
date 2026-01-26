import {
  MetadataDto,
  SocialNetworkEventDto,
  FunnelStage,
  FacebookEventType,
  TiktokEventType,
} from '@common/contracts';
import { Entity, Column, PrimaryColumn } from 'typeorm';

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
