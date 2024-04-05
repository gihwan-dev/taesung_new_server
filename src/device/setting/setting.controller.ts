import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('device-setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get(':id')
  async getSetting(@Param('id') id: string) {
    return await this.settingService.getSetting(+id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteSetting(@Param('id') id: string) {
    return await this.settingService.deleteSetting(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateSetting(
    @Param('id') id: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return await this.settingService.updateSetting(+id, updateSettingDto);
  }
}
