import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    JwtService,
    PrismaService,
    ConfigService,
    BcryptService,
  ],
})
export class UserModule {}
