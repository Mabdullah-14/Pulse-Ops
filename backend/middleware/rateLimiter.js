const { rateLimit } = require('express-rate-limit')

const mutationLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,

    keyGenerator: (req) => req.user?.id,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: 'Too Many Requests',
            message: 'Mutation rate limit exceeded . Please try again later.'
        })
    }
})

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,

    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: 'Too Many Requests',
            message: 'Too many authentication attempts. Please try again after 15 minutes.'

        })
    }
})

const selectiveMutationLimit = (req, res, next) => {
    if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method)) {
        return mutationLimiter(req, res, next)
    }
    next()
}

module.exports = {
    selectiveMutationLimit, authLimiter
}