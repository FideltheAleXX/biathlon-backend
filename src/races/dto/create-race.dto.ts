import { IsString, IsDateString, IsNotEmpty, IsEnum } from 'class-validator';
import { Discipline, Gender, Status } from '../../../prisma/generated/enums';

export class CreateRaceDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  stageId!: string;

  @IsDateString()
  @IsNotEmpty()
  date!: Date;

  @IsNotEmpty()
  @IsEnum(Discipline)
  discipline!: Discipline;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender!: Gender;

  @IsString()
  @IsNotEmpty()
  distance!: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status!: Status;
}
