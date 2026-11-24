import { z } from 'zod'

export const addMemberSchema = z.object({
    userId: z
        .string({
            message: 'User ID is required',
        })
        .trim()
        .uuid('Invalid User ID format'),
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

