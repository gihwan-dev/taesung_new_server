import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InfoService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.device_info.findMany();
  }
}
