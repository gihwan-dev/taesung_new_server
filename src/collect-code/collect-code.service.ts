import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CollectCodeService {
  constructor(private prisma: PrismaService) {}

  async getCollectCode() {
    return await this.prisma.collect_code.findMany();
  }
}
