import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class CollectCodeService {
  constructor(private prisma: PrismaService) {}

  async getCollectCode(ccIdx: number) {
    return await this.prisma.collect_code.findUnique({
      where: {
        cc_idx: ccIdx,
      },
    });
  }
}
