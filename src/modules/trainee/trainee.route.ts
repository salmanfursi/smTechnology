import { Router } from 'express';
import { TraineeController } from './trainee.controller';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';

const router = Router();
const traineeController = new TraineeController();

router.get('/profile', authenticateJWT, authorizeRoles(['TRAINEE']), traineeController.getProfile);
router.put('/profile', authenticateJWT, authorizeRoles(['TRAINEE']), traineeController.updateProfile);

export default router;
