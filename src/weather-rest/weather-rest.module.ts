import { Module } from '@nestjs/common';
import { WeatherRestService } from './weather-rest.service';
import { WeatherRestController } from './weather-rest.controller';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [WeatherRestController],
  providers: [WeatherRestService, PrismaService],
})
export class WeatherRestModule {}
