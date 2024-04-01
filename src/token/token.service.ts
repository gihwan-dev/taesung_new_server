import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  async createToken(email: string, token: string) {
    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        token,
      },
    });
  }

  async deleteToken(email: string) {
    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        token: null,
      },
    });
  }
}
