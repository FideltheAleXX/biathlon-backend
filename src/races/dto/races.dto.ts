import { RaceStatus } from './race-status.dto';

export class RaceDto {
  id!: number;
  stage_id!: string;
  date!: string;
  discipline!: string;
  gender!: string;
  distance!: string;
  status!: RaceStatus;
}
