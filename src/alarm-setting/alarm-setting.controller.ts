import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AlarmSettingService } from './alarm-setting.service';
import { UpdateAlarmSettingDto } from './dto/alarm-setting.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('alarm-setting')
export class AlarmSettingController {
  constructor(private readonly alarmSettingService: AlarmSettingService) {}

  @Get(':id')
  async getAlarmSetting(@Param('id') id: string) {
    const result = await this.alarmSettingService.getAlarmSetting(+id);
    if (!result) {
      throw new NotFoundException('해당하는 알람 설정이 없습니다.');
    }

    return result;
  }

  // 알람 batSet, ouSet 업데이트 하는 엔드포인트
  @UseGuards(AuthGuard)
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
