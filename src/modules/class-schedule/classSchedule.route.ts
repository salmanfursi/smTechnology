import { Router } from 'express';
import { ClassScheduleController } from './classSchedule.controller';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';

const router = Router();
const classScheduleController = new ClassScheduleController();

router.get('/', authenticateJWT, classScheduleController.getAllSchedules);
router.post('/', authenticateJWT, authorizeRoles(['ADMIN']), classScheduleController.createSchedule);

export default router;
