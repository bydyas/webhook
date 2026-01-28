import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get a simple report on social networks events.' })
  @ApiResponse({
    status: 200,
    description: 'Get a simple report on social networks events.',
  })
  async report(): Promise<unknown> {
    return this.reportsService.getSummary();
  }
}
