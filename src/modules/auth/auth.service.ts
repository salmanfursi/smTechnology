import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation Schemas
export const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'TRAINER', 'TRAINEE'])
});

export class AuthService {
  async register(data: z.infer<typeof RegisterSchema>) {
    // Validate input
    const validatedData = RegisterSchema.parse(data);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword
      }
    });

    // Create associated profile based on role
    if (validatedData.role === 'TRAINER') {
      await prisma.trainer.create({
        data: {
          userId: user.id,
          specialization: 'Not specified',
          contactNumber: ''
        }
      });
    } else if (validatedData.role === 'TRAINEE') {
      await prisma.trainee.create({
        data: {
          userId: user.id
        }
      });
    }

    return user;
  }

  async login(email: string, password: string) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    return { user, token };
  }
}