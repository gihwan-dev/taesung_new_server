import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class AlarmDataService {
  constructor(
    private prisma: PrismaService,
    private firebase: FirebaseService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async sendPushNotification() {
    const lastAlarm = await this.getLastAlarmIndex();
    const lastAlarmIndex = lastAlarm === null ? 0 : lastAlarm.ad_idx;
    const alarmDataList = await this.getAlarmForPush(lastAlarmIndex);
    console.log('alarmDataList: ', alarmDataList);
    // TODO: 알람 보내고 알람 로그 저장하기.
    // 메시지 리스트를 만든다.
  }

  async sendEachData(
    alarmDataList: Awaited<ReturnType<typeof this.getAlarmForPush>>,
  ) {
    for (const alarmData of alarmDataList) {
      const alarmCode = await this.prisma.alarm_code.findUnique({
        where: {
          ac_idx: alarmData.ac_idx,
        },
      });

      const tokens = await this.prisma.user.findMany({});

      const message: MulticastMessage = {
        tokens,
      };
    }
  }

  async getLastAlarmIndex() {
    return this.prisma.push_notification_log.findFirst({
      orderBy: {
        reg_date: 'desc',
      },
    });
  }

  async getAlarmForPush(index: number) {
    return this.prisma.alarm_data.findMany({
      where: {
        ad_idx: {
          gt: index,
        },
      },
    });
  }

  async getAlarmData(diIdx: number, acIdx: number) {
    if (acIdx == 0) {
      return this.prisma.alarm_data.findMany({
        where: {
          di_idx: diIdx,
        },
      });
    }

    return this.prisma.alarm_data.findMany({
      where: {
        di_idx: diIdx,
        ac_idx: acIdx,
      },
    });
  }
}
