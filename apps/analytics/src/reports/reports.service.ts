import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '@common/logger';
import { SocialEvent } from '@common/contracts';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(SocialEvent)
    private eventsRepository: Repository<SocialEvent>,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Mocked report method.
   */
  async getSummary(topUserLimit = 10): Promise<unknown> {
    this.logger.log(`Getting summary report.`);

    try {
      const totalEventsRaw = await this.eventsRepository
        .createQueryBuilder('event')
        .select('COUNT(*)', 'totalEvents')
        .getRawOne();
      const totalEvents = Number(totalEventsRaw?.totalEvents || 0);

      // Events by type
      const byEventTypeRaw = await this.eventsRepository
        .createQueryBuilder('event')
        .select('event.eventType', 'eventType')
        .addSelect('COUNT(*)', 'count')
        .groupBy('event.eventType')
        .orderBy('count', 'DESC')
        .getRawMany();

      const byEventType: Record<string, number> = {};
      byEventTypeRaw.forEach(
        (r) => (byEventType[r.eventType] = Number(r.count)),
      );

      // Events by funnel stage
      const byFunnelStageRaw = await this.eventsRepository
        .createQueryBuilder('event')
        .select('event.funnelStage', 'funnelStage')
        .addSelect('COUNT(*)', 'count')
        .groupBy('event.funnelStage')
        .orderBy('count', 'DESC')
        .getRawMany();

      const byFunnelStage: Record<string, number> = {};
      byFunnelStageRaw.forEach(
        (r) => (byFunnelStage[r.funnelStage] = Number(r.count)),
      );

      // Top users (from JSONB data)
      const topUsersRaw = await this.eventsRepository
        .createQueryBuilder('event')
        .select(`data->'user'->>'userId'`, 'userId')
        .addSelect(`data->'user'->>'username'`, 'username')
        .addSelect('COUNT(*)', 'events')
        .groupBy(`data->'user'->>'userId'`)
        .addGroupBy(`data->'user'->>'username'`)
        .orderBy('events', 'DESC')
        .limit(topUserLimit)
        .getRawMany();

      const topUsers = topUsersRaw.map((r) => ({
        userId: r.userId,
        username: r.username,
        events: Number(r.events),
      }));

      return {
        totalEvents,
        byEventType,
        byFunnelStage,
        topUsers,
      };
    } catch (error) {
      this.logger.error(
        `Failed getting summary report: ${JSON.stringify(error)}.`,
      );
    }
  }
}
