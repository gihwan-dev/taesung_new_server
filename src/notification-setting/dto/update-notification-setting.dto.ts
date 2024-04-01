export class UpdateNotificationSettingDto {
  readonly type: 'collect' | 'doorOpen' | 'ouOver' | 'lowBattery';
  readonly value: boolean;
}
