import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateGateway } from './state.gateway';
import { PrismaService } from 'src/prisma.service';
import { InfoService } from '../info/info.service';

@Module({
  providers: [StateGateway, StateService, PrismaService, InfoService],
})
export class StateModule {}
