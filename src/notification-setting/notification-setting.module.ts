import { Module } from '@nestjs/common';
import { NotificationSettingService } from './notification-setting.service';
import { NotificationSettingController } from './notification-setting.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [NotificationSettingController],
  providers: [NotificationSettingService, PrismaService],
})
export class NotificationSettingModule {}
