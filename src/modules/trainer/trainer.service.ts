import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TrainerService {
  async getAllTrainers() {
    return prisma.trainer.findMany({ include: { user: true } });
  }

  async assignTrainer(trainerId: string, scheduleId: string) {
    const trainer = await prisma.trainer.findUnique({ where: { id: trainerId } });
    if (!trainer) {
      throw new Error('Trainer not found');
    }

    return prisma.classSchedule.update({
      where: { id: scheduleId },
      data: { trainerId }
    });
  }
}
