import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
}
