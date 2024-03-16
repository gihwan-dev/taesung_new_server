export class updateNotificationSettingDto {
  readonly type: 'collect' | 'doorOpen' | 'ouOver' | 'lowBattery';
  readonly value: boolean;
}
