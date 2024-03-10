import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    return await this.prisma.sensor_data.findFirst({
      where: {
        di_idx: id,
      },
    });
  }
}
