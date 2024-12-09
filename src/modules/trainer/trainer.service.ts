import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TrainerService {
  // Fetch all trainers
  async getAllTrainers() {
    return prisma.trainer.findMany({
      include: {
        user: true, // Include user details
      },
    });
  }

  // Assign a trainer to a class schedule
  async assignTrainer(trainerId: string, scheduleId: string) {
    const trainer = await prisma.trainer.findUnique({
      where: { id: trainerId },
    });

    if (!trainer) {
      throw new Error('Trainer not found');
    }

    return prisma.classSchedule.update({
      where: { id: scheduleId },
      data: { trainerId },
    });
  }

  // Get a trainer's details by ID
  async getTrainerById(trainerId: string) {
    return prisma.trainer.findUnique({
      where: { id: trainerId },
      include: {
        user: true,
      },
    });
  }
}
