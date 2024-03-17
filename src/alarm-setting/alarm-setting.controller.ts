import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AlarmSettingService } from './alarm-setting.service';
import { UpdateAlarmSettingDto } from './dto/alarm-setting.dto';

@Controller('alarm-setting')
export class AlarmSettingController {
  constructor(private readonly alarmSettingService: AlarmSettingService) {}

  @Get(':id')
  async getAlarmSetting(@Param('id') id: string) {
    console.log('get alarm setting device id: ', id);
    return await this.alarmSettingService.getAlarmSetting(+id);
  }

  @Patch(':id')
  async updateAlarmSetting(
    @Param('id') id: string,
    @Body() updateAlarmSettingDto: UpdateAlarmSettingDto,
  ) {
    return await this.alarmSettingService.updateAlarmSetting(
      +id,
      updateAlarmSettingDto,
    );
  }
}
