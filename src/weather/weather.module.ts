import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherGateway } from './weather.gateway';
import { PrismaService } from 'src/prisma.service';
import { InfoService } from '../device/info/info.service';

@Module({
  providers: [WeatherGateway, WeatherService, PrismaService, InfoService],
})
export class WeatherModule {}
