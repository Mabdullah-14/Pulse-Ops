import { z } from 'zod';

export const createIssueSchema = z.object({
    statusId: z.string().uuid('Invalid status ID'),
    title: z
        .string({ required_error: 'Title is required' })
        .min(2, 'Title must be at least 2 characters')
        .max(200, 'Title cannot exceed 200 characters'),
    description: z.string().optional().nullable(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
});

export const updateIssueSchema = z.object({
    version: z.number().int().positive('Version is required for updates'),
    statusId: z.string().uuid().optional(),
    title: z.string().min(2).max(200).optional(),
    description: z.string().optional().nullable(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
    position: z.number().int().min(0).optional(),
});


