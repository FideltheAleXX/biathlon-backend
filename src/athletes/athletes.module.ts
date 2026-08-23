import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AthletesController } from './athletes.controller';
import { AthletesService } from './athletes.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RaceModule } from '../races/race.module';
import { StagesModule } from '../stages/stages.module';

@Module({
  imports: [DatabaseModule, PrismaModule, RaceModule, StagesModule],
  controllers: [AthletesController],
  providers: [AthletesService],
})
export class AthletesModule {}
