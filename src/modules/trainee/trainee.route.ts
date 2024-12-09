import { Router } from 'express';
 import { authenticateJWT, authorizeRoles } from '../../middleware/auth.middleware';
import { TraineeController } from './trainee.controller';
 
const router = Router();
const traineeController = new TraineeController();

router.get('/profile', authenticateJWT, authorizeRoles(['TRAINEE']), traineeController.getProfile);
router.put('/profile', authenticateJWT, authorizeRoles(['TRAINEE']), traineeController.updateProfile);

export default router;


 