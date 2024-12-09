import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClassScheduleService {
  async getAllSchedules() {
    return prisma.classSchedule.findMany({ include: { trainer: true, classBookings: true } });
  }

  async createSchedule(data: { trainerId: string; scheduleDate: string; startTime: string; endTime: string }) {
    const count = await prisma.classSchedule.count({
      where: { scheduleDate: new Date(data.scheduleDate) }
    });

    if (count >= 5) {
      throw new Error('Maximum schedules for the day reached');
    }

    return prisma.classSchedule.create({ data });
  }
}
