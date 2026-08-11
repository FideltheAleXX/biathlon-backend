import { IsString, IsDateString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateStageDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty({ message: 'Название этапа не должно быть пустым' })
  name!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsArray()
  competitions?: string[];
}
