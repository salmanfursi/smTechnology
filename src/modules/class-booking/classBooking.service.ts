import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClassBookingService {
  async bookClass(traineeId: string, classScheduleId: string) {
    const schedule = await prisma.classSchedule.findUnique({ where: { id: classScheduleId } });

    if (!schedule || schedule.maxParticipants <= schedule.classBookings.length) {
      throw new Error('Class schedule is full');
    }

    return prisma.classBooking.create({
      data: {
        traineeId,
        classScheduleId
      }
    });
  }
}
