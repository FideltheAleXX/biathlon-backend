import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AthleteDto } from './dto/athlete.dto';
import { CreateAthleteDto } from './dto/create-athlete.dto';

@Injectable()
export class AthletesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<AthleteDto[]> {
    const athletes = await this.prisma.athlete.findMany({
      orderBy: [
        {
          result: {
            _max: {
              points: 'desc',
            },
          },
        },
        {
          lastName: 'asc',
        },
      ],
    });
    return athletes;
  }

  async getOne(id: string): Promise<AthleteDto> {
    const athlete = await this.prisma.athlete.findFirst({
      where: { id },
    });

    if (!athlete) {
      throw new NotFoundException(`Athlete with ID "${id}" not found`);
    }

    return athlete;
  }

  async createAthlete(data: CreateAthleteDto): Promise<AthleteDto> {
    const { id, firstName, lastName, country } = data;

    return this.prisma.athlete.create({
      data: {
        id,
        firstName,
        lastName,
        country,
      },
    });
  }

  async updateAthlete(id: string, data: CreateAthleteDto): Promise<AthleteDto> {
    const { firstName, lastName, country } = data;

    return this.prisma.athlete.update({
      where: { id },
      data: {
        firstName,
        lastName,
        country,
      },
    });
  }

  async deleteAthlete(id: string) {
    await this.prisma.athlete.delete({
      where: { id },
    });
  }
}
