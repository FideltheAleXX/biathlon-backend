import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client';
import athletesData from '../data/athletes.json';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function importAthletes() {
  console.log('Початок заповнення БД...');

  for (const athlete of athletesData) {
    await prisma.athlete.create({
      data: {
        firstName: athlete.firstName,
        lastName: athlete.lastName,
        country: athlete.country,
        genderId: athlete.genderId,
      },
    });
  }
  console.log('БД успішно заповнена!');
}

importAthletes()
  .catch((e) => {
    console.error('Помилка при заповненні БД:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
