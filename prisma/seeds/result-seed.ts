import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Athlete } from '../generated/client';
import resultData from '../data/results.json';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function importResults() {
  console.log('Початок заповнення БД...');

  for (const result of resultData) {
    await prisma.result.create({
      data: {
        position: result.position,
        athlete: result.athlete,
        country: result.country,
        time: result.time,
        misses: result.misses,
        points: +result.points,
      },
    });
  }
  console.log('БД успішно заповнена!');
}

importResults()
  .catch((e) => {
    console.error('Помилка при заповненні БД:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
