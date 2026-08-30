import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client';
import resultData from '../data/result906.json';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const RACE_ID = 'wc-2526-906';

async function importResults() {
  console.log('Початок заповнення БД...');

  // await prisma.result.deleteMany({
  //   where: {
  //     raceId: RACE_ID,
  //   },
  // });

  for (const result of resultData) {
    const athlete = await prisma.athlete.findUnique({
      where: {
        firstName_lastName: {
          firstName: result.firstName,
          lastName: result.lastName,
        },
      },
    });

    if (!athlete) {
      console.warn(`Athlete not found: ${result.firstName} ${result.lastName}`);
      continue;
    }

    await prisma.result.create({
      data: {
        raceId: RACE_ID,
        athleteId: athlete.id,
        position: result.position,
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
