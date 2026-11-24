const { z } = require('zod');

const createOrgSchema = z.object({
  name: z
    .string({
      message: 'Organization name is required',
    })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  slug: z
    .string({
      message: 'Slug is required',
    })
    .trim()
    .toLowerCase()
    .min(2, 'Slug is required')
    .max(50, 'Slug cannot exceed 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers and hyphens'),
});

module.exports = {
  createOrgSchema,
};
