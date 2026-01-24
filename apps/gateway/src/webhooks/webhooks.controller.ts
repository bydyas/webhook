import { Body, Controller, Post } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Webhooks')
@Controller('')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('marketing/webhook')
  @ApiOperation({ summary: 'Forward marketing events' })
  @ApiResponse({
    status: 201,
    description: 'Marketing events forwarded successfully.',
  })
  async forwardMarketingEvents(@Body() events: any[]): Promise<boolean> {
    return this.webhooksService.forwardMarketingEvents(events);
  }
}
