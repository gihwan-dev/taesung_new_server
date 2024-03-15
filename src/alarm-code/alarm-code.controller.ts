import { Controller, Get } from '@nestjs/common';
import { AlarmCodeService } from './alarm-code.service';

@Controller('alarm-code')
export class AlarmCodeController {
  constructor(private readonly alarmCodeService: AlarmCodeService) {}

  @Get()
  async getAlarmCodes() {
    return await this.alarmCodeService.getAlarmCodes();
  }
}
