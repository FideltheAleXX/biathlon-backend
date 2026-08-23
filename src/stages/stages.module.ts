import { Module } from '@nestjs/common';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';
import { DatabaseModule } from '../database/database.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [StagesController],
  providers: [StagesService],
})
export class StagesModule {}
