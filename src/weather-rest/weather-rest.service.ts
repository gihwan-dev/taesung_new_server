import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class WeatherRestService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number, startDate: string, endDate: string) {
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    return await this.prisma.weather_data.findMany({
      where: {
        di_idx: id,
        reg_date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  }
}
