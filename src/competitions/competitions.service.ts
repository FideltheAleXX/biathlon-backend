import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateCompetitionsDto } from './dto/create-competitions.dto';
import { CompetitionsDto } from './dto/competitions.dto';

@Injectable()
export class CompetitionsService {
  constructor(@Inject('DATABASE_POOL') private readonly db: Pool) {}

  async getAll() {
    const queryText = `
      SELECT * FROM competitions ORDER BY id DESC;
    `;

    const result = await this.db.query(queryText);
    return result.rows;
  }

  async getAllFromOneStage(stageId: string) {
    const queryText = `
       SELECT * 
    FROM competitions 
    WHERE stage_id = $1
    ORDER BY id DESC;
    `;

    const result = await this.db.query(queryText, [stageId]);

    if (result.rows.length === 0) {
      throw new NotFoundException(
        `Competitions with stageId ${stageId} not found`,
      );
    }
    return result.rows;
  }

  async getOne(id: string) {
    const queryText = `
      SELECT * 
    FROM competitions 
    WHERE id = $1;
    `;

    const result = await this.db.query(queryText, [id]);

    if (result.rows.length === 0) {
      throw new NotFoundException(`Competitions with ID ${id} not found`);
    }

    return result.rows[0];
  }

  async createCompetitions(
    data: CreateCompetitionsDto,
  ): Promise<CompetitionsDto> {
    const { id, stageId, date, discipline, gender, distance, status } = data;

    const queryText = `
      INSERT INTO competitions (id, stage_id, date, discipline, gender, distance, status)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING id, stage_id AS "stageId", date, discipline, gender, distance, status;
    `;
    const values = [id, stageId, date, discipline, gender, distance, status];
    const result = await this.db.query(queryText, values);

    return result.rows[0];
  }

  async updateCompetitions(
    id: string,
    data: CreateCompetitionsDto,
  ): Promise<CompetitionsDto> {
    const queryText = `
      UPDATE competitions
      SET 
        stage_id = $1, 
        date = $2, 
        discipline = $3, 
        gender = $4,
        distance = $5,
        status = $6
      WHERE id = $7
      RETURNING id, stage_id AS "stageId", date, discipline, gender, distance, status;
    `;

    const values = [
      data.stageId,
      data.date,
      data.discipline,
      data.gender,
      data.distance,
      data.status,
      id,
    ];

    const result = await this.db.query(queryText, values);

    if (result.rows.length === 0) {
      throw new NotFoundException(`Competitions with ID ${id} not found`);
    }

    return result.rows[0];
  }

  async deleteCompetitions(id: string) {
    const queryText = `
      DELETE FROM competitions WHERE id = $1 RETURNING *;
    `;

    const result = await this.db.query(queryText, [id]);

    if (result.rows.length === 0) {
      throw new NotFoundException(`Competitions with ID ${id} not found`);
    }

    return result.rows[0];
  }
}
