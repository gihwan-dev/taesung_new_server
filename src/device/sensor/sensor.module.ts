import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorGateway } from './sensor.gateway';
import { PrismaService } from 'src/prisma.service';
import { InfoService } from '../info/info.service';

@Module({
  providers: [SensorGateway, SensorService, PrismaService, InfoService],
})
export class SensorModule {}
