import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class AthletesService {
  constructor(@Inject('DATABASE_POOL') private readonly db: Pool) {}
  async getAll() {}

  async getOne() {}

  async createAthlete() {}

  async updateAthlete() {}

  async deleteAthlete() {}
}
