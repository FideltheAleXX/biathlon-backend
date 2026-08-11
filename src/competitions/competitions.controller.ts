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
import { CompetitionsService } from './competitions.service';
import { CompetitionsDto } from './dto/competitions.dto';
import { CreateCompetitionsDto } from './dto/create-competitions.dto';

@Controller('stages')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get()
  async getAllCompetitions(): Promise<CompetitionsDto[]> {
    return this.competitionsService.getAll();
  }

  @Get('stage/:stageId')
  async getAllCompetitionsFromStage(
    @Param('stageId') stageId: string,
  ): Promise<CompetitionsDto[]> {
    return this.competitionsService.getAllFromOneStage(stageId);
  }

  @Get(':id')
  async getOneCompetitions(
    @Param('id') id: string,
  ): Promise<CompetitionsDto[]> {
    return this.competitionsService.getOne(id);
  }

  @Post()
  async createCompetitions(
    @Body() data: CreateCompetitionsDto,
  ): Promise<CompetitionsDto> {
    return this.competitionsService.createCompetitions(data);
  }

  @Put(':id')
  async updateCompetitions(
    @Param('id') id: string,
    @Body() data: CreateCompetitionsDto,
  ): Promise<CompetitionsDto> {
    return this.competitionsService.updateCompetitions(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCompetitions(@Param('id') id: string): Promise<void> {
    await this.competitionsService.deleteCompetitions(id);
  }
}
