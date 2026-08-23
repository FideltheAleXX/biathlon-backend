import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { StageDto } from './dto/stage.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StagesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<StageDto[]> {
    const stages = await this.prisma.stage.findMany({
      orderBy: {
        startDate: 'asc',
      },
      include: { race: true },
    });

    return stages;
  }

  async getOne(id: string): Promise<StageDto> {
    const stage = await this.prisma.stage.findFirst({
      where: { id },
      include: {
        race: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });

    if (!stage) {
      throw new NotFoundException(`Stage with ID "${id}" not found`);
    }

    return stage;
  }

  async createStage(data: CreateStageDto): Promise<StageDto> {
    const { id, name, location, startDate, endDate } = data;

    return this.prisma.stage.create({
      data: {
        id,
        name,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      include: { race: true },
    });
  }

  async updateStage(id: string, data: CreateStageDto): Promise<StageDto> {
    const { name, location, startDate, endDate } = data;

    return this.prisma.stage.update({
      where: { id },
      data: {
        name,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      include: { race: true },
    });
  }

  async deleteStage(id: string) {
    await this.prisma.stage.delete({
      where: { id },
    });
  }
}
