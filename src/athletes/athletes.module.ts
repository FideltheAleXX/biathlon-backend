import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AthletesController } from './athletes.controller';
import { AthletesService } from './athletes.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AthletesController],
  providers: [AthletesService],
})
export class AthletesModule {}
