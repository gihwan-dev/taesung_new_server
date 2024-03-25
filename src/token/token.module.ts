import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TokenController],
  providers: [TokenService, JwtService, ConfigService, PrismaService],
})
export class TokenModule {}
