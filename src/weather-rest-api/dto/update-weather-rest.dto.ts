import { PartialType } from '@nestjs/swagger';
import { CreateWeatherRestDto } from './create-weather-rest.dto';

export class UpdateWeatherRestDto extends PartialType(CreateWeatherRestDto) {}
