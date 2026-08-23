import { Discipline, Gender, Status } from '../../../prisma/generated/enums';

export class RaceDto {
  id!: string;
  stageId!: string;
  date!: Date;
  discipline!: Discipline;
  gender!: Gender;
  distance!: string;
  status!: Status;
  result?: unknown[]; //TODO
}
