import { Module } from '@nestjs/common';
import { NotificationSettingService } from './notification-setting.service';
import { NotificationSettingController } from './notification-setting.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [NotificationSettingController],
  providers: [
    NotificationSettingService,
    PrismaService,
    JwtService,
    ConfigService,
  ],
})
export class NotificationSettingModule {}
