import { z } from 'zod';

export const createStatusSchema = z.object({
    name: z
        .string({ required_error: 'Column name is required' })
        .trim()
        .min(1, 'Column name cannot be empty')
        .max(50, 'Column name cannot exceed 50 characters'),
});

export const updateStatusSchema = z.object({
    name: z.string().min(1).max(50).optional(),
    position: z.number().int().min(0).optional(),
});

