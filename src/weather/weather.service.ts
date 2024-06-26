import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WeatherService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number) {
    return this.prisma.weather_data.findFirst({
      where: {
        di_idx: id,
      },
      orderBy: {
        reg_date: 'desc',
      },
    });
  }
}
