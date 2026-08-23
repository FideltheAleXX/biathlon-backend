import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateResultDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  raceId!: string;

  @IsString()
  @IsNotEmpty()
  athleteId!: string;

  @IsString()
  country?: string;

  @IsNumber()
  leg?: number;

  @IsNumber()
  position?: number;

  @IsString()
  time?: string;

  @IsString()
  misses?: string;

  @IsNumber()
  points?: number;
}
