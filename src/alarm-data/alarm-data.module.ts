import { Module } from '@nestjs/common';
import { AlarmDataService } from './alarm-data.service';
import { AlarmDataController } from './alarm-data.controller';
import { PrismaService } from 'src/prisma.service';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  controllers: [AlarmDataController],
  providers: [AlarmDataService, PrismaService, FirebaseService],
})
export class AlarmDataModule {}
