import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { StateService } from './state.service';
import { Socket } from 'dgram';

@WebSocketGateway({ namespace: 'state', transport: ['websocket'] })
export class StateGateway {
  constructor(private readonly stateService: StateService) {}

  @SubscribeMessage('findOneDeviceState')
  async findOne(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    console.log('findOneDeviceState emitted', 'id: ', id);
    const findOneResult = await this.stateService.findOne(+id);
    console.log('findOneDeviceState', findOneResult);
    client.emit('findOneDeviceState', findOneResult);
  }

  @SubscribeMessage('startCollect')
  async startCollect(
    @MessageBody() id: number,
    @ConnectedSocket() client: Socket,
  ) {
    const result = await this.stateService.startCollect(id);
    console.log('startCollect result: ', result);
    client.emit('findOneDeviceState', result);
  }

  @SubscribeMessage('resetCollect')
  async resetCollect(
    @MessageBody() id: number,
    @ConnectedSocket() client: Socket,
  ) {
    const result = await this.stateService.resetCollect(id);
    console.log('resetCollect result: ', result);
    client.emit('findOneDeviceState', result);
  }
}
