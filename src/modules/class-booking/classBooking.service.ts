import { PrismaClient, BookingStatus, ClassStatus } from '@prisma/client';
import { ApiError } from '../../utils/errorHandler.util';

const prisma = new PrismaClient();

export class ClassBookingService {
  async bookClass(traineeId: string, classScheduleId: string) {
    // Check class schedule availability
    const classSchedule = await prisma.classSchedule.findUnique({
      where: { id: classScheduleId },
      include: { 
        _count: { 
          select: { classBookings: { where: { status: 'CONFIRMED' } } } 
        }
      }
    });

    if (!classSchedule) {
      throw new ApiError(404, 'Class schedule not found');
    }

    // Check if class is full
    if (classSchedule._count.classBookings >= classSchedule.maxParticipants) {
      throw new ApiError(400, 'Class schedule is full. Maximum participants reached.');
    }

    // Check if class is active
    if (classSchedule.status !== ClassStatus.ACTIVE) {
      throw new ApiError(400, 'Class is not available for booking');
    }

    // Create booking
    const booking = await prisma.classBooking.create({
      data: {
        traineeId,
        classScheduleId,
        status: BookingStatus.CONFIRMED
      }
    });

    return booking;
  }

  async cancelBooking(bookingId: string, traineeId: string) {
    // Implement booking cancellation logic
    const booking = await prisma.classBooking.findUnique({
      where: { 
        id: bookingId,
        traineeId: traineeId
      }
    });

    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    // Update booking status
    return prisma.classBooking.update({
      where: { id: bookingId },
      data: { status: BookingStatus.CANCELLED }
    });
  }
}