import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlarmCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async getAlarmCodes() {
    return this.prisma.alarm_code.findMany();
  }
}
