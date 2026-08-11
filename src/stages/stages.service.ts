import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateStageDto } from './dto/create-stage.dto';
import { StageDto } from './dto/stage.dto';

@Injectable()
export class StagesService {
  constructor(@Inject('DATABASE_POOL') private readonly db: Pool) {}

  async getAll() {
    const queryText = `
      SELECT s.*, 
             COALESCE(json_agg(c.*) FILTER (WHERE c.id IS NOT NULL), '[]') as competitions
      FROM stages s
      LEFT JOIN competitions c ON s.id = c.stage_id
      GROUP BY s.id;
    `;

    const result = await this.db.query(queryText);
    return result.rows;
  }

  async getOne(id: string) {
    const queryText = `
      SELECT s.*, 
             COALESCE(json_agg(c.*) FILTER (WHERE c.id IS NOT NULL), '[]') as competitions
      FROM stages s
      LEFT JOIN competitions c ON s.id = c.stage_id
      WHERE s.id = $1
      GROUP BY s.id;
    `;

    const result = await this.db.query(queryText, [id]);

    if (result.rows.length === 0) {
      throw new NotFoundException(`Stage with ID ${id} not found`);
    }

    return result.rows[0];
  }

  async createStage(data: CreateStageDto): Promise<StageDto> {
    const { id, name, location, startDate, endDate } = data;
    const queryText = `
      INSERT INTO stages (id, name, location, startDate, endDate)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, name, location, start_date AS "startDate", end_date AS "endDate";
    `;
    const values = [id, name, location, startDate, endDate];
    const result = await this.db.query(queryText, values);

    return result.rows[0];
  }

  async updateStage(id: string, data: CreateStageDto): Promise<StageDto> {
    const queryText = `
      UPDATE stages
      SET 
        name = $1, 
        location = $2, 
        start_date = $3, 
        end_date = $4
      WHERE id = $5
      RETURNING id, name, location, start_date AS "startDate", end_date AS "endDate";
    `;

    const values = [data.name, data.location, data.startDate, data.endDate, id];

    const result = await this.db.query(queryText, values);

    if (result.rows.length === 0) {
      throw new NotFoundException(`Stage with ID ${id} not found`);
    }

    return result.rows[0];
  }

  async deleteStage(id: string) {
    const queryText = `
      DELETE FROM stages WHERE id = $1 RETURNING *;
    `;

    const result = await this.db.query(queryText, [id]);

    if (result.rows.length === 0) {
      throw new NotFoundException(`Stage with ID ${id} not found`);
    }

    return result.rows[0];
  }
}
