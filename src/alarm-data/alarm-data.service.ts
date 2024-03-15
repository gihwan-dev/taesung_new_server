import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlarmDataService {
  constructor(private prisma: PrismaService) {}

  async getAlarmData(diIdx: number, acIdx: number) {
    if (acIdx == 0) {
      return await this.prisma.alarm_data.findMany({
        where: {
          di_idx: diIdx,
        },
      });
    }

    return await this.prisma.alarm_data.findMany({
      where: {
        di_idx: diIdx,
        ac_idx: acIdx,
      },
    });
  }
}
