import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const db = app.get<Pool>('DATABASE_POOL');

  try {
    console.log('Starting...');

    const filePath = path.resolve('races.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const races = JSON.parse(fileContent);

    console.log(
      `[Seed] File have written. Races for reading found: ${races.length}`,
    );

    const values: any[] = [];

    const valueLines = races
      .map((race, index) => {
        const offset = index * 7;

        values.push(
          race.id,
          race.stage_id,
          race.date,
          race.discipline,
          race.gender,
          race.distance || null,
          race.status,
        );

        return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7})`;
      })
      .join(', ');

    const queryText = `
      INSERT INTO competitions (id, stage_id, date, discipline, gender, distance, status)
      VALUES ${valueLines}
      ON CONFLICT (id) DO NOTHING;
    `;

    const result = await db.query(queryText, values);
    console.log(`Races have import: ${result.rowCount}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await app.close();
    console.log('End.');
  }
}

bootstrap();
