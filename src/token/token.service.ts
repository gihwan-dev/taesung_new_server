import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  async createToken(email: string, token: string) {
    return await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        token,
      },
    });
  }
}
