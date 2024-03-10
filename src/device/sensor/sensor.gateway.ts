import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SensorService } from './sensor.service';
import { Socket } from 'dgram';

@WebSocketGateway({ namespace: 'sensor', transport: ['websocket'] })
export class SensorGateway {
  constructor(private readonly sensorService: SensorService) {}

  @SubscribeMessage('findOneSensorData')
  async findOne(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    console.log('findOneSensorData emitted', 'id: ', id);
    const findOneResult = await this.sensorService.findOne(+id);
    client.emit('findOneSensorData', findOneResult);
  }
}
