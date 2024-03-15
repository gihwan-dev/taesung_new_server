import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
}
