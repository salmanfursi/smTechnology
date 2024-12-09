import { Router } from 'express';
import { TrainerController } from './trainer.controller';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';

const router = Router();
const trainerController = new TrainerController();

router.get('/', authenticateJWT, authorizeRoles(['ADMIN']), trainerController.getAllTrainers);
router.post('/assign', authenticateJWT, authorizeRoles(['ADMIN']), trainerController.assignTrainer);

export default router;
