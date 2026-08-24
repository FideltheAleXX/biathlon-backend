import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ResultDto } from '../../result/dto/result.dto';
import { GenderId } from '../../../prisma/generated/enums';

export class CreateAthleteDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsEnum(GenderId)
  genderId!: GenderId;

  @IsString()
  result?: ResultDto[];
}
