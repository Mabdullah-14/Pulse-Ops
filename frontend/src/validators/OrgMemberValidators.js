import { z } from 'zod'

export const addMemberSchema = z.object({
    ElementInternals: z
        .string({
            message: 'Email  is required',
        })
        .trim()
        .email('Please enter a valid email address'),
    roleId: z
        .string({
            message: 'Role ID is required',
        })
        .trim()
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

