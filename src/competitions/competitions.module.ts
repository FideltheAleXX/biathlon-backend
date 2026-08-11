import { Module } from '@nestjs/common';
import { CompetitionsController } from './competitions.controller';
import { CompetitionsService } from './competitions.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CompetitionsController],
  providers: [CompetitionsService],
})
export class CompetitionsModule {}
