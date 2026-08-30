import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client';

import result906 from '../data/result906.json';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

interface PreparedResults {
  raceId: string;
  athleteId: string;
  country: string;
  position: number;
  time: string;
  misses: string;
  points: number;
}

async function importResults(raceId: string, resultData: any) {
  const athletes = await prisma.athlete.findMany({
    select: { id: true, firstName: true, lastName: true },
  });

  const athleteMap = new Map(
    athletes.map((a) => [`${a.firstName}_${a.lastName}`, a.id]),
  );

  const preparedResults: PreparedResults[] = [];

  for (const result of resultData) {
    const key = `${result.firstName}_${result.lastName}`;
    const athleteId = athleteMap.get(key);

    if (!athleteId) {
      console.warn(
        `Спортсмен ${result.firstName} ${result.lastName} не знайдений в БД`,
      );
      continue;
    }

    preparedResults.push({
      raceId,
      athleteId: athleteId,
      country: result.country,
      position: result.position,
      time: result.time,
      misses: result.misses,
      points: +result.points,
    });
  }

  await prisma.result.createMany({
    data: preparedResults,
    skipDuplicates: true,
  });

  console.log('БД заповнена!');
}

importResults('wc-2526-906', result906);

// .catch((e) => {
//   console.error('Помилка при заповненні БД:', e);
//   process.exit(1);
// })
// .finally(async () => {
//   await prisma.$disconnect();
// });
