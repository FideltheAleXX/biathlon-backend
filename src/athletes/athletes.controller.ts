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
import { AthletesService } from './athletes.service';
import { AthleteDto } from './dto/athlete.dto';
import { CreateAthleteDto } from './dto/create-athlete.dto';

@Controller('athletes')
export class AthletesController {
  constructor(private readonly athletesService: AthletesService) {}

  @Get()
  async getAllAthletes(): Promise<AthleteDto[]> {
    return this.athletesService.getAll();
  }

  @Get(':id')
  async getOneAthlete(@Param('id') id: string) {
    return this.athletesService.getOne(id);
  }

  @Post()
  async createAthlete(@Body() data: CreateAthleteDto): Promise<AthleteDto> {
    return this.athletesService.createAthlete(data);
  }

  @Put(':id')
  async updateAthlete(
    @Param('id') id: string,
    @Body() data: CreateAthleteDto,
  ): Promise<AthleteDto> {
    return this.athletesService.updateAthlete(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAthlete(@Param('id') id: string): Promise<void> {
    await this.athletesService.deleteAthlete(id);
  }
}
