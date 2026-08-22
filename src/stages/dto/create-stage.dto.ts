import { IsString, IsDateString, IsNotEmpty, IsArray } from 'class-validator';
import { RaceDto } from '../../races/dto/races.dto';

export class CreateStageDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty({ message: 'Назва етапу не повинна бути пуста' })
  name!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsDateString()
  startDate!: Date;

  @IsDateString()
  endDate!: Date;

  @IsArray()
  race?: RaceDto[];
}
