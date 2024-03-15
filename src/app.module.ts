import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StateModule } from './device/state/state.module';
import { SettingModule } from './device/setting/setting.module';
import { SensorModule } from './device/sensor/sensor.module';
import { CollectCodeModule } from './collect-code/collect-code.module';
import { InfoModule } from './device/info/info.module';
import { WeatherModule } from './weather/weather.module';
import { SensorRestModule } from './sensor-rest/sensor-rest.module';
import { WeatherRestModule } from './weather-rest/weather-rest.module';
import { AlarmCodeModule } from './alarm-code/alarm-code.module';
import { AlarmDataModule } from './alarm-data/alarm-data.module';
import { AlarmSettingModule } from './alarm-setting/alarm-setting.module';
import { NotificationSettingModule } from './notification-setting/notification-setting.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    InfoModule,
    SettingModule,
    StateModule,
    SensorModule,
    CollectCodeModule,
    WeatherModule,
    SensorRestModule,
    WeatherRestModule,
    AlarmCodeModule,
    AlarmDataModule,
    AlarmSettingModule,
    NotificationSettingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
