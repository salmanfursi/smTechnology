import { Request, Response } from 'express';
import { TrainerService } from './trainer.service';

const trainerService = new TrainerService();

export class TrainerController {
  async getAllTrainers(req: Request, res: Response) {
    try {
      const trainers = await trainerService.getAllTrainers();
      res.json({ success: true, data: trainers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async assignTrainer(req: Request, res: Response) {
    try {
      const { trainerId, scheduleId } = req.body;
      const schedule = await trainerService.assignTrainer(trainerId, scheduleId);
      res.json({ success: true, message: 'Trainer assigned successfully', data: schedule });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
