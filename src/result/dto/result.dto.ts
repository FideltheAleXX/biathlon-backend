export class ResultDto {
  id!: string;
  raceId!: string;
  athleteId!: string;
  country?: string | null;
  leg?: number | null;
  position?: number | null;
  time?: string | null;
  misses?: string | null;
  points?: number | null;
}
