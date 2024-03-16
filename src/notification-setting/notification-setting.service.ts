import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { updateNotificationSettingDto } from './dto/update-notification-setting.dto';

@Injectable()
export class NotificationSettingService {
  constructor(private readonly prisma: PrismaService) {}

  async getNotificationSetting(id: number) {
    return await this.prisma.notification_setting.findFirst({
      where: {
        di_idx: id,
      },
    });
  }

  async updateNotificationSetting(
    nsIdx: number,
    updateNotificationSettingDto: updateNotificationSettingDto,
  ) {
    switch (updateNotificationSettingDto.type) {
      case 'collect':
        return await this.prisma.notification_setting.update({
          where: { ns_idx: nsIdx },
          data: { ns_collect: updateNotificationSettingDto.value },
        });
      case 'doorOpen':
        return await this.prisma.notification_setting.update({
          where: { ns_idx: nsIdx },
          data: { ns_doorOpen: updateNotificationSettingDto.value },
        });
      case 'ouOver':
        return await this.prisma.notification_setting.update({
          where: { ns_idx: nsIdx },
          data: { ns_ouOver: updateNotificationSettingDto.value },
        });
      case 'lowBattery':
        return await this.prisma.notification_setting.update({
          where: { ns_idx: nsIdx },
          data: { ns_lowBattery: updateNotificationSettingDto.value },
        });
    }
  }
}
