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
import { StagesService } from './stages.service';
import { StageDto } from './dto/stage.dto';
import { CreateStageDto } from './dto/create-stage.dto';

@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Get()
  async getAllStages(): Promise<StageDto[]> {
    return this.stagesService.getAll();
  }

  @Get(':id')
  async getOneStage(@Param('id') id: string): Promise<StageDto[]> {
    return this.stagesService.getOne(id);
  }

  @Post()
  async createStage(@Body() data: CreateStageDto): Promise<StageDto> {
    return this.stagesService.createStage(data);
  }

  @Put(':id')
  async updateStage(
    @Param('id') id: string,
    @Body() data: CreateStageDto,
  ): Promise<StageDto> {
    return this.stagesService.updateStage(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteStage(@Param('id') id: string): Promise<void> {
    await this.stagesService.deleteStage(id);
  }
}
