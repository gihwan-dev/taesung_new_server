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
}
