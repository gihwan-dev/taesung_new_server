import { Module } from '@nestjs/common';
import { AlarmSettingService } from './alarm-setting.service';
import { AlarmSettingController } from './alarm-setting.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AlarmSettingController],
  providers: [AlarmSettingService, PrismaService],
})
export class AlarmSettingModule {}
