import {
  IsString,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { CompetitionsStatus } from './competitions-status.dto';

export class CreateCompetitionsDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  stageId!: string;

  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @IsString()
  @IsNotEmpty()
  discipline!: string;

  @IsString()
  @IsNotEmpty()
  gender!: string;

  @IsString()
  distance?: string[];

  @IsEnum(CompetitionsStatus)
  status!: CompetitionsStatus;
}
