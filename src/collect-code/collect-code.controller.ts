import { Controller, Get } from '@nestjs/common';
import { CollectCodeService } from './collect-code.service';

@Controller('collect-code')
export class CollectCodeController {
  constructor(private readonly collectCodeService: CollectCodeService) {}

  @Get()
  async getCollectCode() {
    return await this.collectCodeService.getCollectCode();
  }
}
