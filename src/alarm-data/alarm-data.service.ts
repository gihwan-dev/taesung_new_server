import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AsyncReturnType } from '../utils/type.utils';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
import { alarm_code, alarm_data, device_info } from '@prisma/client';

interface Message {
  allowedUserTokenList: string[];
  deviceInfo: device_info;
  alarmCode: alarm_code;
}

@Injectable()
export class AlarmDataService {
  constructor(
    private prisma: PrismaService,
    private firebase: FirebaseService,
  ) {}

  // 매 5초마다 알림을 보낼 수 있는지 확인하고 알림을 보내는 함수
  @Cron(CronExpression.EVERY_5_SECONDS)
  async sendPushNotification() {
    // alarm_log 테이블을 통해 마지막으로 보낸 알림의 인덱스를 가져온다.
    const lastAlarm = await this.getLastAlarmIndex();
    // 저장된 알람 로그가 없다면 모든 알람 데이터를 가져옵니다. (초기 동작시에만 해당됨.)
    const lastAlarmIndex = lastAlarm === null ? 0 : lastAlarm.ad_idx;
    const alarmDataList =
      await this.getAlarmForPushNotification(lastAlarmIndex);
    await this.iterateListAndSendEachMessage(alarmDataList);
  }

  async iterateListAndSendEachMessage(
    alarmDataList: AsyncReturnType<typeof this.getAlarmForPushNotification>,
  ) {
    // 알람 리스트를 순회하면서
    for (const alarmData of alarmDataList) {
      // 해당 알림을 받도록 허용한 유저들의 email 값의 리스트를 구한다.
      const allowedUserList = await this.findAllowedUserListByAlarmCode(
        alarmData.ac_idx,
      );
      // token 값이 null 인 경우를 필터링 한다.( default 값이 알림 허용이므로 token 이 null 이라도 알람 설정은 허용 값을 가질 수 있다.)
      const allowedUserTokenList =
        await this.getAllowedUserTokenList(allowedUserList);
      // 알림 메시지를 만들어 보낸다.
      const alarmCode = await this.getAlarmCode(alarmData);
      const deviceInfo = await this.getDeviceInfo(alarmData);
      const message = this.createMessage({
        allowedUserTokenList,
        deviceInfo,
        alarmCode,
      });
      // 메세지 보내기
      await this.firebase.sendNotifications(message);
      await this.createNotificationLog(alarmData.ad_idx);
    }
  }

  async createNotificationLog(adIdx: number) {
    return this.prisma.push_notification_log.create({
      data: {
        ad_idx: adIdx,
      },
    });
  }

  createMessage({
    allowedUserTokenList,
    deviceInfo,
    alarmCode,
  }: Message): MulticastMessage {
    return {
      tokens: allowedUserTokenList,
      notification: {
        title: `${deviceInfo.di_nick_name === null ? `${deviceInfo.di_idx}번 기기` : `${deviceInfo.di_nick_name} 기기`} ${alarmCode.ac_name}`,
      },
    };
  }

  async getDeviceInfo(alarmData: alarm_data) {
    return this.prisma.device_info.findUnique({
      where: {
        di_idx: alarmData.di_idx,
      },
    });
  }

  async getAlarmCode(alarmData: alarm_data) {
    return this.prisma.alarm_code.findUnique({
      where: {
        ac_idx: alarmData.ac_idx,
      },
    });
  }

  async getAllowedUserTokenList(
    allowedUserList: AsyncReturnType<
      typeof this.findAllowedUserListByAlarmCode
    >,
  ) {
    const userList = await this.prisma.user.findMany({
      where: {
        email: {
          in: allowedUserList.map((user) => user.user_email),
        },
        token: {
          not: null,
        },
      },
    });
    return userList.map((user) => user.token);
  }

  // 알람 코드에 따라 알림을 받을 수 있는 유저들을 찾는 함수
  async findAllowedUserListByAlarmCode(acIdx: number) {
    switch (acIdx) {
      case 1:
        return this.prisma.notification_setting.findMany({
          where: {
            ns_doorOpen: true,
          },
          select: {
            user_email: true,
          },
        });
      case 2:
        return this.prisma.notification_setting.findMany({
          where: {
            ns_ouOver: true,
          },
          select: {
            user_email: true,
          },
        });
      case 3:
        return this.prisma.notification_setting.findMany({
          where: {
            ns_lowBattery: true,
          },
          select: {
            user_email: true,
          },
        });
      case 4:
        return this.prisma.notification_setting.findMany({
          where: {
            ns_collect: true,
          },
          select: {
            user_email: true,
          },
        });
      case 5:
        return this.prisma.notification_setting.findMany({
          where: {
            ns_collect: true,
          },
          select: {
            user_email: true,
          },
        });
      default:
        throw new BadRequestException(
          '유효하지 않은 알람 코드가 입력되었습니다.',
        );
    }
  }

  async getLastAlarmIndex() {
    return this.prisma.push_notification_log.findFirst({
      orderBy: {
        reg_date: 'desc',
      },
    });
  }

  async getAlarmForPushNotification(index: number) {
    return this.prisma.alarm_data.findMany({
      where: {
        ad_idx: {
          gt: index,
        },
      },
    });
  }

  async getAlarmData(diIdx: number, acIdx: number) {
    if (typeof diIdx !== 'number' || typeof acIdx !== 'number') {
      throw new BadRequestException('di_idx 와 ac_idx 를 입력해주세요.');
    }

    if (acIdx == 0) {
      //acIdx 가 0이라면 모든 종류 알람 데이터를 보여줌.
      return this.prisma.alarm_data.findMany({
        where: {
          di_idx: diIdx,
        },
        orderBy: {
          reg_date: 'desc',
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
