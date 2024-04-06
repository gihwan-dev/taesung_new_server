import { Controller, Get, Param, Query } from '@nestjs/common';
import { WeatherRestService } from './weather-rest.service';

@Controller('weather-rest-api')
export class WeatherRestController {
  constructor(private readonly weatherRestService: WeatherRestService) {}

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.weatherRestService.findOne(+id, startDate, endDate);
  }
}
