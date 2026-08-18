import { PrismaClient } from '@prisma/client';
import stagesData from './data/stages.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Початок заповнення БД...');

  for (const stage of stagesData) {
    await prisma.stage.create({
      data: {
        id: stage.id,
        name: stage.name,
        location: stage.location,
        start_date: new Date(stage.start_date),
        end_date: new Date(stage.end_date),
        race: {
          create: stage.race.map((race) => ({
            id: String(race.id),
            date: new Date(race.date),
            discipline: race.discipline,
            gender: race.gender,
            distance: race.distance,
            status: race.status,
          })),
        },
      },
    });
  }

  console.log('БД успішно заповнена!');
}

main()
  .catch((e) => {
    console.error('❌ Помилка при заповненні БД:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
