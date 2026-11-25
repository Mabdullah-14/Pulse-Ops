const { z } = require('zod');

const addMemberSchema = z.object({
    email: z
        .string({
            message: 'User ID is required',
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
