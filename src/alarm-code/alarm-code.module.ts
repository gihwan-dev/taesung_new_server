import { Module } from '@nestjs/common';
import { AlarmCodeService } from './alarm-code.service';
import { AlarmCodeController } from './alarm-code.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AlarmCodeController],
  providers: [AlarmCodeService, PrismaService],
})
export class AlarmCodeModule {}
