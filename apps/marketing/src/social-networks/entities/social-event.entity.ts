import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'events' })
export class SocialEvent {
  @PrimaryColumn()
  eventId: string;

  @Column()
  timestamp: string;

  @Column()
  source: string;

  @Column()
  funnelStage: string;

  @Column()
  eventType: string;

  @Column({ type: 'jsonb' })
  data: unknown;
}
