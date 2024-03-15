import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { comparePassword } from './auth.utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('해당 이메일의 유저를 찾을 수 없습니다.');
    }

    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('비밀번호가 일치하지 않습니다.');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
