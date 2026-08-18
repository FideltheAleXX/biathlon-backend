import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceDto } from './dto/races.dto';
import { CreateRaceDto } from './dto/create-race.dto';

@Controller('stages')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Get()
  async getAllCompetitions(): Promise<RaceDto[]> {
    return this.raceService.getAll();
  }

  @Get('stage/:stageId')
  async getAllCompetitionsFromStage(
    @Param('stageId') stageId: string,
  ): Promise<RaceDto[]> {
    return this.raceService.getAllFromOneStage(stageId);
  }

  @Get(':id')
  async getOneCompetitions(@Param('id') id: string): Promise<RaceDto[]> {
    return this.raceService.getOne(id);
  }

  @Post()
  async createCompetitions(@Body() data: CreateRaceDto): Promise<RaceDto> {
    return this.raceService.createCompetitions(data);
  }

  @Put(':id')
  async updateCompetitions(
    @Param('id') id: string,
    @Body() data: CreateRaceDto,
  ): Promise<RaceDto> {
    return this.raceService.updateCompetitions(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCompetitions(@Param('id') id: string): Promise<void> {
    await this.raceService.deleteCompetitions(id);
  }
}
