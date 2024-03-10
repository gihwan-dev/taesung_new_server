import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { InfoService } from './info.service';
import { Socket } from 'dgram';

@WebSocketGateway({ namespace: 'info', transports: ['websocket'] })
export class InfoGateway {
  constructor(private readonly infoService: InfoService) {}

  @SubscribeMessage('findAllDeviceInfo')
  async findAll(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('findAllDeviceInfo emitted', 'data: ', data);
    const allDeviceInfo = await this.infoService.findAll();
    console.log('findAllDeviceInfo', allDeviceInfo);
    client.emit('findAllDeviceInfo', allDeviceInfo);
  }

  @SubscribeMessage('findOneDeviceInfo')
  findOne(@MessageBody() id: number) {
    return this.infoService.findOne(id);
  }
}
