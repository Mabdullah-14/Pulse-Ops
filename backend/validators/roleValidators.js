const { z } = require('zod');
const { ALL_PERMISSIONS } = require('../constants/permission');

const roleNameSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Role name must be at least 2 characters')
        .max(50, 'Role name must be at most 50 characters'),
    permissions: z
        .array(z.enum(ALL_PERMISSIONS))
        .min(1, 'At least one permission must be selected'),
});

const updateRoleSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Role name must be at least 2 characters')
        .max(50, 'Role name must be at most 50 characters')
        .optional(),
    permissions: z
        .array(z.enum(ALL_PERMISSIONS))
        .min(1, 'At least one permission must be selected')
        .optional(),
});

module.exports = {
    roleNameSchema,
    updateRoleSchema,
};
