import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [InfoController],
  providers: [InfoService, JwtService, PrismaService, ConfigService],
})
export class InfoModule {}
