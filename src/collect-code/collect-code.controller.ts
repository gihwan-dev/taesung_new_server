import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CollectCodeService } from './collect-code.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('collect-code')
export class CollectCodeController {
  constructor(private readonly collectCodeService: CollectCodeService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async getCollectCode(@Param('id') id: string) {
    console.log('id:', id);
    return await this.collectCodeService.getCollectCode(+id);
  }
}
