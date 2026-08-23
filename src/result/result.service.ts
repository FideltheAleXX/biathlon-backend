import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResultDto } from './dto/result.dto';
import { CreateResultDto } from './dto/create-result.dto';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<ResultDto[]> {
    return this.prisma.result.findMany({
      include: {
        athlete: true,
        race: {
          include: {
            stage: true,
          },
        },
      },
      orderBy: [{ stage: { startTime: 'desc' } }, { position: 'asc' }],
    });
  }

  async getByRace(raceId: string): Promise<ResultDto[]> {
    return this.prisma.result.findMany({
      where: { raceId },
      include: { athlete: true },
      orderBy: { position: 'asc' },
    });
  }

  async getByAthlete(athleteId: string): Promise<ResultDto[]> {
    return this.prisma.result.findMany({
      where: { athleteId },
      include: { race: { include: { stage: true } } },
      orderBy: { race: { id: 'asc' } },
    });
  }

  async createResult(data: CreateResultDto): Promise<ResultDto> {
    const {
      id,
      raceId,
      athleteId,
      country,
      leg,
      position,
      time,
      misses,
      points,
    } = data;
    return this.prisma.result.create({
      data: {
        id,
        raceId,
        athleteId,
        country,
        leg,
        position,
        time,
        misses,
        points,
      },
      include: { race: true },
    });
  }

  async updateResult(id: string, data: CreateResultDto): Promise<ResultDto> {
    const { raceId, athleteId, country, leg, position, time, misses, points } =
      data;

    return this.prisma.result.update({
      where: { id },
      data: { raceId, athleteId, country, leg, position, time, misses, points },
      include: { race: true },
    });
  }
}
