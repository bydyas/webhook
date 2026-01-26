import { Type } from 'class-transformer';
import { IsString, IsUUID, IsNumber, IsDateString, ValidateNested, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FacebookEventType, FunnelStage, TiktokEventType } from '../types';

class UserDto {
    @ApiProperty({ type: 'string', format: 'uuid', description: 'Unique identifier for the user', example: 'ec512eca-fee0-4781-b53f-4a86430bd46c' })
    @IsUUID()
    userId: string;

    @ApiProperty({ type: 'string', description: 'Username of the user', example: 'Ressie7' })
    @IsString()
    username: string;

    @ApiProperty({ type: 'number', description: 'Number of followers', example: 311578 })
    @IsNumber()
    followers: number;
}

class EngagementDto {
    @ApiProperty({ type: 'number', description: 'Watch time in seconds', example: 72 })
    @IsNumber()
    watchTime: number;

    @ApiProperty({ type: 'number', description: 'Percentage of video watched', example: 81 })
    @IsNumber()
    percentageWatched: number;

    @ApiProperty({ type: 'string', description: 'Device type used', example: 'Android' })
    @IsString()
    device: string;

    @ApiProperty({ type: 'string', description: 'Country where engagement occurred', example: 'Ecuador' })
    @IsString()
    country: string;

    @ApiProperty({ type: 'string', description: 'Video identifier', example: 'vid-xFvZ4EFd' })
    @IsString()
    videoId: string;
}

export class MetadataDto {
    @ApiProperty({ type: () => UserDto, description: 'User information' })
    @IsObject()
    @ValidateNested()
    @Type(() => UserDto)
    user: UserDto;

    @ApiProperty({ type: () => EngagementDto, description: 'Engagement metrics' })
    @IsObject()
    @ValidateNested()
    @Type(() => EngagementDto)
    engagement: EngagementDto;
}

export class SocialNetworkEventDto {
    @ApiProperty({ type: 'string', format: 'uuid', description: 'Unique event identifier', example: 'ttk-e4a15421-b14b-4933-9b63-2f997e906fb5' })
    // @IsUUID()
    @IsString()
    eventId: string;

    @ApiProperty({ type: 'string', description: 'Type of event', example: 'like' })
    @IsString()
    eventType: TiktokEventType | FacebookEventType;

    @ApiProperty({ type: 'string', description: 'Social network source', example: 'tiktok' })
    @IsString()
    source: 'tiktok' | 'facebook';

    @ApiProperty({ type: 'string', format: 'date-time', description: 'Event timestamp', example: '2026-01-25T17:31:13.660Z' })
    @IsDateString()
    timestamp: string;

    @ApiProperty({ type: 'string', description: 'Funnel stage of the event', example: 'top' })
    @IsString()
    funnelStage: FunnelStage;

    @ApiProperty({ type: () => MetadataDto, description: 'Event metadata including user and engagement information' })
    @IsObject()
    @ValidateNested()
    @Type(() => MetadataDto)
    data: MetadataDto;
}
