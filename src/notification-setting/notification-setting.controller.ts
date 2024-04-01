import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotificationSettingService } from './notification-setting.service';
import { UpdateNotificationSettingDto } from './dto/update-notification-setting.dto';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('notification-setting')
export class NotificationSettingController {
  constructor(
    private readonly notificationSettingService: NotificationSettingService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async getNotificationSetting(@Req() req: Request, @Param('id') id: string) {
    console.log('get notification setting device id: ', id);
    console.log(req['user']);
    const userEmail = req['user'].email;
    return await this.notificationSettingService.getNotificationSetting(
      +id,
      userEmail,
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateNotificationSetting(
    @Req() req: Request,
    @Param('id') nsIdx: string,
    @Body() body: UpdateNotificationSettingDto,
  ) {
    console.log('update notification setting device id: ', nsIdx);
    console.log('update notification setting body: ', body);
    console.log('user: ', req['user']);
    const userEmail = req['user'].email;
    return await this.notificationSettingService.updateNotificationSetting({
      updateNotificationSettingDto: body,
      nsIdx: +nsIdx,
      userEmail: userEmail,
    });
  }
}
