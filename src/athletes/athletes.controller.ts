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

@Controller('athletes')
export class AthletesController {
  constructor(private readonly athletesService: AthletesService) {}

  @Get()
  async getAllAthlete(){
    return this.athletesService.getAll();
  }

  @Get(':id')
  async getOneAthlete(@Param('id') id: number) {
    return this.athletesService.getOne(id);
  }

  @Post()
  async createStage(@Body() data: ){
    return this.athletesService.createAthlete(data);
  }

  @Put(':id')
  async updateStage(
    @Param('id') id: number,
    @Body() data:,
  ) {
    return this.athletesService.updateAthlete(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteStage(@Param('id') id: number) {
    await this.athletesService.deleteAthlete(id);
  }
}
