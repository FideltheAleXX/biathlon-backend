import { IsNotEmpty, IsString } from 'class-validator';
import { ResultDto } from '../../result/dto/result.dto';

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

  @IsString()
  result?: ResultDto[];
}
