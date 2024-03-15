import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorGateway } from './sensor.gateway';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SensorGateway, SensorService, PrismaService],
})
export class SensorModule {}
