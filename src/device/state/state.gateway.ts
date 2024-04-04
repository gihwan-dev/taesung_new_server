import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { StateService } from './state.service';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { Cron, CronExpression } from '@nestjs/schedule';

@WebSocketGateway({ namespace: 'state', transport: ['websocket'] })
export class StateGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly stateService: StateService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async pullAndEmitData() {
    const allDeviceInfo = await this.stateService.getAllDeviceInfo();
    for (const deviceInfo of allDeviceInfo) {
      const findOneResult = await this.stateService.findOne(deviceInfo.di_idx);
      this.server.emit('findOneDeviceState', findOneResult);
    }
  }

  @SubscribeMessage('findOneDeviceState')
  async findOne(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    const findOneResult = await this.stateService.findOne(+id);
    client.emit('findOneDeviceState', findOneResult);
  }

  @SubscribeMessage('startCollect')
  async startCollect(
    @MessageBody() id: number,
    @ConnectedSocket() client: Socket,
  ) {
    const result = await this.stateService.startCollect(id);
    client.emit('findOneDeviceState', result);
  }

  @SubscribeMessage('resetCollect')
  async resetCollect(
    @MessageBody() id: number,
    @ConnectedSocket() client: Socket,
  ) {
    const result = await this.stateService.resetCollect(id);
    client.emit('findOneDeviceState', result);
  }
}
