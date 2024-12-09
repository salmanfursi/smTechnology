import { Request, Response } from 'express';
import { ClassScheduleService } from './classSchedule.service';

const classScheduleService = new ClassScheduleService();

export class ClassScheduleController {
  async getAllSchedules(req: Request, res: Response) {
    try {
      const schedules = await classScheduleService.getAllSchedules();
      res.json({ success: true, data: schedules });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createSchedule(req: Request, res: Response) {
    try {
      const schedule = await classScheduleService.createSchedule(req.body);
      res.status(201).json({ success: true, message: 'Schedule created successfully', data: schedule });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
