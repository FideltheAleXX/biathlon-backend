import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Discipline, Gender, PrismaClient, Status } from '../generated/client';
import racesData from '../data/races.json';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function seedRacesBulk() {
  // Подготавливаем данные для bulk insert
  const races = racesData.map((race) => ({
    id: race.id,
    date: new Date(race.date),
    discipline: race.discipline as Discipline,
    gender: race.gender as Gender,
    distance: race.distance,
    status: (race.status as Status) || 'Scheduled',
  }));

  try {
    // Создаем все гонки одной операцией
    const result = await prisma.race.createMany({
      data: races,
      skipDuplicates: true, // пропускаем дубликаты по уникальным полям
    });

    console.log(`✅ Успешно создано ${result.count} гонок`);
  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRacesBulk();
