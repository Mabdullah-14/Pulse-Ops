import { z } from 'zod';

export const addMemberSchema = z.object({
    email: z
        .string({
            message: 'Email is required',
        })
        .trim()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    roleId: z
        .string({
            message: 'Role ID is required',
        })
        .trim()
        .min(1, 'Please select a role')
        .uuid('Invalid Role ID format'),
});

export const changeRoleSchema = z.object({
    roleId: z
        .string({
            message: 'Role ID is required',
        })
        .trim()
        .uuid('Invalid Role ID format'),
});
