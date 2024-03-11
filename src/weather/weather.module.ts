import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherGateway } from './weather.gateway';
import { PrismaService } from 'prisma.service';

@Module({
  providers: [WeatherGateway, WeatherService, PrismaService],
})
export class WeatherModule {}
