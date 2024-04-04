import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InfoService } from '../info/info.service';

@Injectable()
export class StateService {
  constructor(
    private prisma: PrismaService,
    private deviceInfoService: InfoService,
  ) {}

  async getAllDeviceInfo() {
    return this.deviceInfoService.findAll();
  }

  async findOne(id: number) {
    return this.prisma.device_state.findFirst({
      where: {
        di_idx: id,
      },
    });
  }

  async startCollect(id: number) {
    await this.prisma.device_state.updateMany({
      where: {
        di_idx: id,
      },
      data: {
        ds_collect: 2,
      },
    });

    return this.prisma.device_state.findFirst({
      where: {
        di_idx: id,
      },
    });
  }

  async resetCollect(id: number) {
    await this.prisma.device_state.updateMany({
      where: {
        di_idx: id,
      },
      data: {
        ds_collect: 1,
      },
    });

    return this.prisma.device_state.findFirst({
      where: {
        di_idx: id,
      },
    });
  }
}
