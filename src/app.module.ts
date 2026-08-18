import { Module } from '@nestjs/common';
import { StagesModule } from './stages/stages.module';
import { RaceModule } from './races/race.module';
import { DatabaseModule } from './database/database.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [StagesModule, RaceModule, DatabaseModule, PrismaModule],
})
export class AppModule {}
