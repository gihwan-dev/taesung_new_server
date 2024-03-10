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
}
