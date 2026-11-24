const { z } = require('zod');

const createStatusSchema = z.object({
  name: z
    .string({ required_error: 'Column name is required' })
    .min(1, 'Column name cannot be empty')
    .max(50, 'Column name cannot exceed 50 characters'),
});

const updateStatusSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  position: z.number().int().min(0).optional(),
});

module.exports = {
  createStatusSchema,
  updateStatusSchema,
};
