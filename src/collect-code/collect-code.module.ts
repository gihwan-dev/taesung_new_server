import { Module } from '@nestjs/common';
import { CollectCodeService } from './collect-code.service';
import { CollectCodeController } from './collect-code.controller';
import { PrismaService } from 'prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CollectCodeController],
  providers: [CollectCodeService, PrismaService, ConfigService, JwtService],
})
export class CollectCodeModule {}
