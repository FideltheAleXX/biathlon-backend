import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Discipline, Gender, PrismaClient, Status } from '../generated/client';
import stagesData from '../data/stages.json';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const disciplineMap: Record<string, Discipline> = {
  Sprint: Discipline.Sprint,
  Pursuit: Discipline.Pursuit,
  Individual: Discipline.Individual,
  MassStart: Discipline.MassStart,
  Relay: Discipline.Relay,
  'Mixed Relay': Discipline.MixedRelay,
  'Single Mixed Relay': Discipline.SingleMixedRelay,
};

const genderMap: Record<string, Gender> = {
  Men: Gender.Men,
  Women: Gender.Women,
  Mixed: Gender.Mixed,
};

const statusMap: Record<string, Status> = {
  Scheduled: Status.Scheduled,
  Ongoing: Status.Ongoing,
  Finished: Status.Finished,
  Cancelled: Status.Cancelled,
};

async function main() {
  console.log('Початок заповнення БД...');

  for (const stage of stagesData) {
    await prisma.stage.create({
      data: {
        id: stage.id,
        name: stage.name,
        location: stage.location,
        startDate: new Date(stage.start_date),
        endDate: new Date(stage.end_date),
        race: {
          create: stage.race.map((race) => ({
            id: String(race.id),
            date: new Date(race.date),
            discipline: disciplineMap[race.discipline],
            gender: genderMap[race.gender],
            distance: race.distance,
            status: statusMap[race.status],
          })),
        },
      },
    });
  }

  console.log('БД успішно заповнена!');
}

main()
  .catch((e) => {
    console.error('Помилка при заповненні БД:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
