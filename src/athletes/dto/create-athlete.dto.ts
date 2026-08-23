import { IsNotEmpty, IsString } from 'class-validator';

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
  result?: unknown[]; //TODO
}
