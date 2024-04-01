import { UpdateNotificationSettingDto } from '../dto/update-notification-setting.dto';

export type UpdateNotificationSettingParams = {
  nsIdx: number;
  updateNotificationSettingDto: UpdateNotificationSettingDto;
  userEmail: string;
};
