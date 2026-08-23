import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateRaceDto } from './dto/create-race.dto';
import { RaceDto } from './dto/race.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RaceService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<RaceDto[]> {
    const races = await this.prisma.race.findMany({
      orderBy: {
        id: 'asc',
      },
      //include: {stage: true}, TODO
    });
    return races;
  }

  async getOne(id: string): Promise<RaceDto> {
    const race = await this.prisma.race.findFirst({
      where: { id },
    });

    if (!race) {
      throw new NotFoundException(`Race with ID "${id}" not found`);
    }
    return race;
  }

  async createRace(data: CreateRaceDto): Promise<RaceDto> {
    const { id, stageId, date, discipline, gender, distance, status } = data;

    return this.prisma.race.create({
      data: {
        id,
        stageId,
        date,
        discipline,
        gender,
        distance,
        status,
      },
    });
  }

  async updateRace(id: string, data: CreateRaceDto): Promise<RaceDto> {
    const { stageId, date, discipline, gender, distance, status } = data;

    return (
      this,
      this.prisma.race.update({
        where: { id },
        data: {
          stageId,
          date,
          discipline,
          gender,
          distance,
          status,
        },
      })
    );
  }

  async deleteRace(id: string) {
    await this.prisma.race.delete({
      where: { id },
    });
  }
}
