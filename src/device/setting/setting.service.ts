import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingService {
  constructor(private prisma: PrismaService) {}

  async getSetting(diIdx: number) {
    return (
      (await this.prisma.device_setting.findFirst({
        where: {
          di_idx: diIdx,
        },
      })) ?? null
    );
  }

  async deleteSetting(diIdx: number) {
    return await this.prisma.device_setting.deleteMany({
      where: {
        di_idx: diIdx,
      },
    });
  }

  async updateSetting(diIdx: number, updateSettingDto: UpdateSettingDto) {
    if (await this.getSetting(diIdx)) {
      await this.prisma.device_setting.updateMany({
        where: {
          di_idx: diIdx,
        },
        data: {
          des_ouOver: +updateSettingDto.ouValue,
          des_delayTime: +updateSettingDto.delayValue,
        },
      });
      return await this.getSetting(diIdx);
    } else {
      return await this.prisma.device_setting.create({
        data: {
          di_idx: diIdx,
          des_ouOver: +updateSettingDto.ouValue,
          des_delayTime: +updateSettingDto.ouValue,
        },
      });
    }
  }
}
