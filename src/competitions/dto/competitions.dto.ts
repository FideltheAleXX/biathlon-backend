import { CompetitionsStatus } from './competitions-status.dto';

export class CompetitionsDto {
  id!: number;
  stage_id!: string;
  date!: string;
  discipline!: string;
  gender!: string;
  distance!: string;
  status!: CompetitionsStatus;
}
