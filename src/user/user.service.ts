import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await this.bcryptService.hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!user) {
      throw new BadRequestException(
        '유저 생성에 실패했습니다. 다시 시도해주세요.',
      );
    }

    const deviceInfoList = await this.prisma.device_info.findMany({
      select: {
        di_idx: true,
      },
    });

    for (const deviceInfo of deviceInfoList) {
      await this.prisma.notification_setting.create({
        data: {
          di_idx: deviceInfo.di_idx,
          ns_collect: true,
          ns_doorOpen: true,
          ns_ouOver: true,
          ns_lowBattery: true,
          user_email: user.email,
        },
      });
    }

    return {
      message: '유저 생성에 성공했습니다.',
    };
  }

  async getUser(userEmail: string) {
    return this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
        email: true,
        name: true,
        reg_date: true,
        token: true,
      },
    });
  }
}
