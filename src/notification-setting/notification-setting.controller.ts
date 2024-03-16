import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { NotificationSettingService } from './notification-setting.service';
import { updateNotificationSettingDto } from './dto/update-notification-setting.dto';

@Controller('notification-setting')
export class NotificationSettingController {
  constructor(
    private readonly notificationSettingService: NotificationSettingService,
  ) {}

  @Get(':id')
  async getNotificationSetting(@Param('id') id: string) {
    console.log('get notification setting device id: ', id);
    return await this.notificationSettingService.getNotificationSetting(+id);
  }

  @Patch(':id')
  async updateNotificationSetting(
    @Param('id') nsIdx: string,
    @Body() body: updateNotificationSettingDto,
  ) {
    console.log('update notification setting device id: ', nsIdx);
    console.log('update notification setting body: ', body);
    return await this.notificationSettingService.updateNotificationSetting(
      +nsIdx,
      body,
    );
  }
}
