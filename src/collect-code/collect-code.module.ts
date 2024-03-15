import { Module } from '@nestjs/common';
import { CollectCodeService } from './collect-code.service';
import { CollectCodeController } from './collect-code.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CollectCodeController],
  providers: [CollectCodeService, PrismaService],
})
export class CollectCodeModule {}
