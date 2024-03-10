import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class InfoService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.device_info.findMany();
  }
}
