import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateAlarmSettingDto } from './dto/alarm-setting.dto';

@Injectable()
export class AlarmSettingService {
  constructor(private readonly prisma: PrismaService) {}

  async getAlarmSetting(id: number) {
    return this.prisma.alarm_setting.findFirst({
      where: {
        di_idx: id,
      },
    });
  }

  async updateAlarmSetting(
    id: number,
    updateNotificationSettingDto: UpdateAlarmSettingDto,
  ) {
    const existingAlarmSetting = await this.prisma.alarm_setting.findFirst({
      where: {
        as_idx: id,
      },
    });

    if (!existingAlarmSetting) {
      throw new NotFoundException('해당하는 알람 설정이 없습니다.');
    }

    return this.prisma.alarm_setting.update({
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
