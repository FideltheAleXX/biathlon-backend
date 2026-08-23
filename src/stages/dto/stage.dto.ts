import { RaceDto } from '../../races/dto/race.dto';

export class StageDto {
  id!: string;
  name!: string;
  location!: string;
  startDate!: Date;
  endDate!: Date;
  race?: RaceDto[];
}
