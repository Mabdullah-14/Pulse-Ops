const { z } = require('zod');

const createProjectSchema = z.object({
    name: z
        .string({ required_error: 'Project name is required' })
        .min(2, 'Project name must be at least 2 characters')
        .max(100, 'Project name cannot exceed 100 characters'),

    key: z
        .string()
        .min(2, 'Key must be at least 2 characters')
        .max(6, 'Key cannot exceed 6 characters')
        .regex(/^[a-zA-Z0-9]+$/, 'Key must contain only letters and numbers')
        .optional(),

    description: z.string().max(2000).optional().nullable(),
    category: z.string().max(50).optional().nullable(),
    budgetHours: z.coerce.number().int().positive().optional().nullable(),
    deliveryDate: z.string().optional().nullable(),
});

const updateProjectSchema = createProjectSchema.partial().extend({
    status: z.enum(['ACTIVE', 'COMPLETED', 'ARCHIVED']).optional(),
});

module.exports = {
    createProjectSchema,
    updateProjectSchema,
};
