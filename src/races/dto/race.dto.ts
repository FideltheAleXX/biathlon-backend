import { Discipline, Gender, Status } from '../../../prisma/generated/enums';
import { ResultDto } from '../../result/dto/result.dto';

export class RaceDto {
  id!: string;
  stageId!: string;
  date!: Date;
  discipline!: Discipline;
  gender!: Gender;
  distance!: string;
  status!: Status;
  result?: ResultDto[];
}
