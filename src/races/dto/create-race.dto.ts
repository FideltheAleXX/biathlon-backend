import {
  IsString,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { RaceStatus } from './race-status.dto';

export class CreateRaceDto {
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

  @IsEnum(RaceStatus)
  status!: RaceStatus;
}
