import { Controller, Get, Query } from '@nestjs/common';
import { AlarmDataService } from './alarm-data.service';

@Controller('alarm-data')
export class AlarmDataController {
  constructor(private readonly alarmDataService: AlarmDataService) {}

  @Get()
  async getAlarmData(
    @Query('di_idx') diIdx: string,
    @Query('ac_idx') acIdx: string,
  ) {
    return await this.alarmDataService.getAlarmData(+diIdx, +acIdx);
  }
}
