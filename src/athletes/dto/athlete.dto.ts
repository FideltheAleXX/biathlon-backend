import { GenderId } from '../../../prisma/generated/enums';
import { ResultDto } from '../../result/dto/result.dto';

export class AthleteDto {
  id!: string;
  firstName!: string;
  lastName!: string;
  country!: string;
  genderId!: GenderId;
  result?: ResultDto[];
}
