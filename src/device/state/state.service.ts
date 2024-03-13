import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    return await this.prisma.device_state.findFirst({
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

    return await this.prisma.device_state.findFirst({
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

    return await this.prisma.device_state.findFirst({
      where: {
        di_idx: id,
      },
    });
  }
}
