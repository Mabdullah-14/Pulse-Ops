import { z } from 'zod';
import { ALL_PERMISSIONS } from '../constants/Permisson';
export const roleNameSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Role name must be at least 2 characters')
        .max(50, 'Role name must be at most 50 characters'),
    permissions: z
        .array(z.enum(ALL_PERMISSIONS))
        .min(1, 'At least one permission must be selected'),
});

export const updateRoleSchema = z.object({
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

