import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters'),
    email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .email('Please enter a valid email address')
        .max(50, 'Email cannot exceed 50 characters'),
    password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters')
        .max(32, 'Password cannot exceed 32 characters'),
});

export const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .email('Please enter a valid email address')
        .max(50, 'Email cannot exceed 50 characters'),
    password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters')
        .max(32, 'Password cannot exceed 32 characters'),
});
