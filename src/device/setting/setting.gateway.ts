import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@WebSocketGateway()
export class SettingGateway {
  constructor(private readonly settingService: SettingService) {}

  @SubscribeMessage('createSetting')
  create(@MessageBody() createSettingDto: CreateSettingDto) {
    return this.settingService.create(createSettingDto);
  }

  @SubscribeMessage('findAllSetting')
  findAll() {
    return this.settingService.findAll();
  }

  @SubscribeMessage('findOneSetting')
  findOne(@MessageBody() id: number) {
    return this.settingService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('updateSetting')
  update(@MessageBody() updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(updateSettingDto.id, updateSettingDto);
  }

  @SubscribeMessage('removeSetting')
  remove(@MessageBody() id: number) {
    return this.settingService.remove(id);
  }
}
