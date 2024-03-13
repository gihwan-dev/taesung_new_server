import { Controller, Get, Param, Query } from '@nestjs/common';
import { SensorRestService } from './sensor-rest.service';

@Controller('sensor-rest')
export class SensorRestController {
  constructor(private readonly sensorRestService: SensorRestService) {}

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.sensorRestService.findOne(+id, startDate, endDate);
  }
}
