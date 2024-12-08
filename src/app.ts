import express from 'express';
import cors from 'cors';

// Import routes
import authRoutes from './modules/auth/auth.route';
import trainerRoutes from './modules/trainer/trainer.route';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trainer', trainerRoutes);


// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: err.message
  });
});

export default app;