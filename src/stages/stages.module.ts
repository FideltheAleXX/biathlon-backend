import { Module } from '@nestjs/common';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';
import { DatabaseModule } from '../database/database.module';
import { CompetitionsModule } from 'src/competitions/competitions.module';

@Module({
  imports: [DatabaseModule, CompetitionsModule],
  controllers: [StagesController],
  providers: [StagesService],
})
export class StagesModule {}
