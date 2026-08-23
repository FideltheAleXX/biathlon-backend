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
import { RaceDto } from './dto/race.dto';
import { CreateRaceDto } from './dto/create-race.dto';

@Controller('races')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Get()
  async getAllRaces(): Promise<RaceDto[]> {
    return this.raceService.getAll();
  }

  @Get(':id')
  async getOneRace(@Param('id') id: string): Promise<RaceDto[]> {
    return this.raceService.getOne(id);
  }

  @Post()
  async createRace(@Body() data: CreateRaceDto): Promise<RaceDto> {
    return this.raceService.createCompetitions(data);
  }

  @Put(':id')
  async updateRace(
    @Param('id') id: string,
    @Body() data: CreateRaceDto,
  ): Promise<RaceDto> {
    return this.raceService.updateCompetitions(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRace(@Param('id') id: string): Promise<void> {
    await this.raceService.deleteRace(id);
  }
}
