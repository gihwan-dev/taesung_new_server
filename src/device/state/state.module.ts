import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateGateway } from './state.gateway';
import { PrismaService } from 'prisma.service';

@Module({
  providers: [StateGateway, StateService, PrismaService],
})
export class StateModule {}
