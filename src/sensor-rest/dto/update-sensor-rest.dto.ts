import { PartialType } from '@nestjs/swagger';
import { CreateSensorRestDto } from './create-sensor-rest.dto';

export class UpdateSensorRestDto extends PartialType(CreateSensorRestDto) {}
