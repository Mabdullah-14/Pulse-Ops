const { z } = require('zod')
const registerSchema = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .trim()
        .min(2, 'Name must be atleast 2 characters')
        .max(50, 'Name cannot be exceed 50 characters'),
    email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .min(2, 'Email must be atleast 2 characters')
        .max(50, 'Email cannot be exceed 50 characters'),
    password: z
        .string({
            required_error: 'Password is required'
        })
        .min(2, 'Password must be atleast 2 characters')
        .max(32, 'Password cannot be exceed 50 characters')

})

const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .min(2, 'Email must be atleast 2 characters')
        .max(50, 'Email cannot be exceed 50 characters'),
    password: z
        .string({
            required_error: 'Password is required'
        })
        .min(2, 'Password must be atleast 2 characters')
        .max(32, 'Password cannot be exceed 50 characters')
})

const refreshTokenSchema = z.object({
    refreshToken: z
        .string({
            required_error: 'Refresh token is required',
        })
        .min(1, 'Refresh token is required'),
})

module.exports = {
    registerSchema,
    loginSchema,
    refreshTokenSchema
}