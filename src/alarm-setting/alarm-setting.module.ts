import { Module } from '@nestjs/common';
import { AlarmSettingService } from './alarm-setting.service';
import { AlarmSettingController } from './alarm-setting.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AlarmSettingController],
  providers: [AlarmSettingService, PrismaService, JwtService, ConfigService],
})
export class AlarmSettingModule {}
