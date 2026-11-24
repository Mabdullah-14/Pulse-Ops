const { z } = require('zod');

const addMemberSchema = z.object({
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

const changeRoleSchema = z.object({
    roleId: z
        .string({
            message: 'Role ID is required',
        })
        .trim()
        .uuid('Invalid Role ID format'),
});

module.exports = {
    addMemberSchema,
    changeRoleSchema,
};
