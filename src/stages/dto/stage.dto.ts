export class StageDto {
  id!: string;
  name!: string;
  location!: string;
  startDate!: string;
  endDate!: string;
  competitions?: string[];
}
