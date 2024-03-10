import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingGateway } from './setting.gateway';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    SettingGateway,
    SettingService,
    JwtService,
    PrismaService,
    ConfigService,
  ],
})
export class SettingModule {}
