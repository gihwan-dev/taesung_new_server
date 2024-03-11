import { Controller, Get, UseGuards } from '@nestjs/common';
import { CollectCodeService } from './collect-code.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('collect-code')
export class CollectCodeController {
  constructor(private readonly collectCodeService: CollectCodeService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getCollectCode() {
    return await this.collectCodeService.getCollectCode();
  }
}
