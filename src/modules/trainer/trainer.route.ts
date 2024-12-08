 import { Router } from 'express';
import { TrainerController } from './trainer.controller';
import { authenticateJWT, authorizeRoles } from '../../middleware/auth.middleware';
 
const router = Router();
const trainerController = new TrainerController();

// Get all trainers (Admin only)
router.get('/', authenticateJWT, authorizeRoles(['ADMIN']), trainerController.getAllTrainers);

// Assign a trainer to a class schedule (Admin only)
router.post('/assign', authenticateJWT, authorizeRoles(['ADMIN']), trainerController.assignTrainer);

// Get a trainer by ID (Admin or Trainer can access)
router.get('/:id', authenticateJWT, authorizeRoles(['ADMIN', 'TRAINER']), trainerController.getTrainerById);

export default router;
