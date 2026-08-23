import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultDto } from './dto/result.dto';
import { CreateResultDto } from './dto/create-result.dto';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get()
  async getAllResult(): Promise<ResultDto[]> {
    return this.resultService.getAll();
  }

  @Get('races/:raceId')
  async getByRace(@Param('raceId') raceId: string): Promise<ResultDto[]> {
    return this.resultService.getByRace(raceId);
  }

  @Get('athletes/:athleteId')
  async getByAthlete(
    @Param('athleteId') athleteId: string,
  ): Promise<ResultDto[]> {
    return this.resultService.getByAthlete(athleteId);
  }

  @Post()
  async createResult(@Body() data: CreateResultDto): Promise<ResultDto> {
    return this.resultService.createResult(data);
  }

  @Put(':id')
  async updateResult(
    @Param('id') id: string,
    data: CreateResultDto,
  ): Promise<ResultDto> {
    return this.resultService.updateResult(id, data);
  }
}
