import { Module } from '@nestjs/common';
import { StagesModule } from './stages/stages.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [StagesModule, CompetitionsModule, DatabaseModule],
})
export class AppModule {}
