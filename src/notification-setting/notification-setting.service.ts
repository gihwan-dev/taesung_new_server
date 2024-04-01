import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateNotificationSettingParams } from './type/update-notification-setting.type';

@Injectable()
export class NotificationSettingService {
  constructor(private readonly prisma: PrismaService) {}

  async getNotificationSetting(id: number, userEmail: string) {
    return this.prisma.notification_setting.findFirst({
      where: {
        di_idx: id,
        user_email: userEmail,
      },
    });
  }

  async updateNotificationSetting({
    updateNotificationSettingDto,
    nsIdx,
    userEmail,
  }: UpdateNotificationSettingParams) {
    switch (updateNotificationSettingDto.type) {
      case 'collect':
        return this.prisma.notification_setting.update({
          where: { ns_idx: nsIdx, user_email: userEmail },
          data: { ns_collect: updateNotificationSettingDto.value },
        });
      case 'doorOpen':
        return this.prisma.notification_setting.update({
          where: { ns_idx: nsIdx, user_email: userEmail },
          data: { ns_doorOpen: updateNotificationSettingDto.value },
        });
      case 'ouOver':
        return this.prisma.notification_setting.update({
          where: { ns_idx: nsIdx, user_email: userEmail },
          data: { ns_ouOver: updateNotificationSettingDto.value },
        });
      case 'lowBattery':
        return this.prisma.notification_setting.update({
          where: { ns_idx: nsIdx, user_email: userEmail },
          data: { ns_lowBattery: updateNotificationSettingDto.value },
        });
    }
  }
}
