import { Module } from '@nestjs/common';
import { SensorRestService } from './sensor-rest.service';
import { SensorRestController } from './sensor-rest.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SensorRestController],
  providers: [SensorRestService, PrismaService],
})
export class SensorRestModule {}
