import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TraineeService {
  async getProfile(userId: string) {
    return prisma.trainee.findUnique({ where: { userId }, include: { user: true } });
  }

  async updateProfile(userId: string, data: { fitnessGoals?: string; medicalConditions?: string }) {
    return prisma.trainee.update({
      where: { userId },
      data
    });
  }
}
