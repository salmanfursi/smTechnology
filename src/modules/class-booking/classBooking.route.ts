import { Router } from 'express';
import { ClassBookingController } from './classBooking.controller';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';

const router = Router();
const classBookingController = new ClassBookingController();

router.post('/book', authenticateJWT, authorizeRoles(['TRAINEE']), classBookingController.bookClass);

export default router;
