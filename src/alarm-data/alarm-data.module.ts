import { Module } from '@nestjs/common';
import { AlarmDataService } from './alarm-data.service';
import { AlarmDataController } from './alarm-data.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AlarmDataController],
  providers: [AlarmDataService, PrismaService],
})
export class AlarmDataModule {}
