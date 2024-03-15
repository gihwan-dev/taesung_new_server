import { Controller, Get, Param } from '@nestjs/common';
import { AlarmSettingService } from './alarm-setting.service';

@Controller('alarm-setting')
export class AlarmSettingController {
  constructor(private readonly alarmSettingService: AlarmSettingService) {}

  @Get(':id')
  async getAlarmSetting(@Param('id') id: string) {
    console.log('get alarm setting device id: ', id);
    return await this.alarmSettingService.getAlarmSetting(+id);
  }
}
