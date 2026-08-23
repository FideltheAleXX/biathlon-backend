import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RaceModule } from '../races/race.module';
import { StagesModule } from '../stages/stages.module';
import { ResultController } from './result.controller';

@Module({
  imports: [DatabaseModule, RaceModule, PrismaModule, StagesModule],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
