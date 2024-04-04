import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WeatherService } from './weather.service';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InfoService } from '../device/info/info.service';

@WebSocketGateway({ namespace: 'weather', transports: ['websocket'] })
export class WeatherGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly weatherService: WeatherService,
    private readonly deviceInfoService: InfoService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async pullAndEmitData() {
    const allDeviceInfo = await this.deviceInfoService.findAll();
    for (const deviceInfo of allDeviceInfo) {
      const findOneResult = await this.weatherService.findOne(
        deviceInfo.di_idx,
      );
      this.server.emit('findOneWeather', findOneResult);
    }
  }

  @SubscribeMessage('findOneWeather')
  async findOne(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    const result = await this.weatherService.findOne(id);
    client.emit('findOneWeather', result);
  }
}
