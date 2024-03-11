import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { WeatherService } from './weather.service';
import { Socket } from 'dgram';

@WebSocketGateway({ namespace: 'weather', transports: ['websocket'] })
export class WeatherGateway {
  constructor(private readonly weatherService: WeatherService) {}

  @SubscribeMessage('findOneWeather')
  async findOne(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    console.log('findOneWeather', id);
    const result = await this.weatherService.findOne(id);
    console.log('findOneWeather', result);
    client.emit('findOneWeather', result);
  }
}
