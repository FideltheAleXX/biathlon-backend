import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATABASE_POOL',
    useFactory: () => {
      const pool = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
      });

      pool.on('connect', () => {
        console.log('Successfully connected to PostgreSQL via NestJS Pool');
      });

      pool.on('error', (err) => {
        console.error('Error in pool PostgreSQL:', err);
        process.exit(-1);
      });

      return pool;
    },
  },
];
