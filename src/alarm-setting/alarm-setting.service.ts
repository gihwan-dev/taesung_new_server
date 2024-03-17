import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateAlarmSettingDto } from './dto/alarm-setting.dto';

@Injectable()
export class AlarmSettingService {
  constructor(private readonly prisma: PrismaService) {}

  async getAlarmSetting(id: number) {
    return await this.prisma.alarm_setting.findFirst({
      where: {
        di_idx: id,
      },
    });
  }

  async updateAlarmSetting(
    id: number,
    updateNotificationSettingDto: UpdateAlarmSettingDto,
  ) {
    return await this.prisma.alarm_setting.update({
      where: {
        as_idx: id,
      },
      data: {
        as_batSet: updateNotificationSettingDto.batValue ?? undefined,
        as_ouSet: updateNotificationSettingDto.ouValue ?? undefined,
      },
    });
  }
}
