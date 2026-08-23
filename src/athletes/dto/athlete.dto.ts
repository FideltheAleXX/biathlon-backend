import { ResultDto } from '../../result/dto/result.dto';

export class AthleteDto {
  id!: string;
  firstName!: string;
  lastName!: string;
  country!: string;
  result?: ResultDto[];
}
