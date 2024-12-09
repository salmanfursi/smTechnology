import { Request, Response } from 'express';
import { TrainerService } from './trainer.service';

const trainerService = new TrainerService();

export class TrainerController {
  // Get all trainers
  async getAllTrainers(req: Request, res: Response) {
    try {
      const trainers = await trainerService.getAllTrainers();
      res.json({ success: true, data: trainers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Assign a trainer to a class schedule
  async assignTrainer(req: Request, res: Response) {
    try {
      const { trainerId, scheduleId } = req.body;
      const updatedSchedule = await trainerService.assignTrainer(trainerId, scheduleId);
      res.json({
        success: true,
        message: 'Trainer assigned successfully',
        data: updatedSchedule,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Get trainer details by ID
  async getTrainerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const trainer = await trainerService.getTrainerById(id);

      if (!trainer) {
        return res.status(404).json({ success: false, message: 'Trainer not found' });
      }

      res.json({ success: true, data: trainer });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
