import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoGateway } from './info.gateway';
import { PrismaService } from 'prisma.service';

@Module({
  providers: [InfoGateway, InfoService, PrismaService],
})
export class InfoModule {}
