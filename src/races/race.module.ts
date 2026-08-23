import { Module } from '@nestjs/common';
import { RaceController } from './race.controller';
import { RaceService } from './race.service';
import { DatabaseModule } from '../database/database.module';
import { PrismaModule } from '../prisma/prisma.module';
import { StagesModule } from '../stages/stages.module';

@Module({
  imports: [DatabaseModule, PrismaModule, StagesModule],
  controllers: [RaceController],
  providers: [RaceService],
})
export class RaceModule {}
