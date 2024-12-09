import { Request, Response } from 'express';
import { ClassBookingService } from './classBooking.service';

const classBookingService = new ClassBookingService();

export class ClassBookingController {
  async bookClass(req: Request, res: Response) {
    try {
      const booking = await classBookingService.bookClass(req.user?.userId!, req.body.classScheduleId);
      res.status(201).json({ success: true, message: 'Class booked successfully', data: booking });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
