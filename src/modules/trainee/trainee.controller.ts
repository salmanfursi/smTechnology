import { Request, Response } from 'express';
import { TraineeService } from './trainee.service';

const traineeService = new TraineeService();

export class TraineeController {
  async getProfile(req: Request, res: Response) {
    try {
      const profile = await traineeService.getProfile(req.user?.userId!);
      res.json({ success: true, data: profile });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const profile = await traineeService.updateProfile(req.user?.userId!, req.body);
      res.json({ success: true, message: 'Profile updated successfully', data: profile });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
