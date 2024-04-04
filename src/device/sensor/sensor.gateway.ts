import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SensorService } from './sensor.service';
import { Socket } from 'dgram';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'sensor', transport: ['websocket'] })
export class SensorGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly sensorService: SensorService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async pullAndEmitData() {
    const allDevice = await this.sensorService.finAllDeviceInfo();
    for (const device of allDevice) {
      const findOneResult = await this.sensorService.findOne(device.di_idx);
      this.server.emit('findOneSensorData', findOneResult);
    }
  }

  @SubscribeMessage('findOneSensorData')
  async findOne(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    const findOneResult = await this.sensorService.findOne(+id);
    client.emit('findOneSensorData', findOneResult);
  }
}
