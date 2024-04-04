import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InfoService } from '../info/info.service';

@Injectable()
export class SensorService {
  constructor(
    private prisma: PrismaService,
    private deviceInfoService: InfoService,
  ) {}

  async findOne(id: number) {
    return this.prisma.sensor_data.findFirst({
      where: {
        di_idx: id,
      },
      orderBy: {
        reg_date: 'desc',
      },
    });
  }

  async finAllDeviceInfo() {
    return this.deviceInfoService.findAll();
  }
}
