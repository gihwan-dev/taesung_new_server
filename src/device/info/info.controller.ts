import { Controller, Get } from '@nestjs/common';
import { InfoService } from './info.service';

@Controller('device-info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  async findAll() {
    return await this.infoService.findAll();
  }
}
