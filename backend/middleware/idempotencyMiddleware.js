const { eq, and } = require('drizzle-orm')
const { db } = require('../config/db')
const { idempotencyKeys } = require('../database/schema/idempotency')

const idempotencyMiddleware = async (req, res, next) => {
    const key = req.headers['idempotency-key']
    if (!key) {
        return res.status(400).json({
            success: false,
            message: 'Idempotency-Key header is required.'
        });
    }
    try {
        const existingRecord = await db.query.idempotencyKeys.findFirst({
            where: and(
                eq(idempotencyKeys.key, key),
                eq(idempotencyKeys.userId, req.user.id)
            ),
        })

        if (existingRecord) {
            await db.update(idempotencyKeys)
                .set({
                    retryCount: existingRecord.retryCount + 1
                })
                .where(eq(idempotencyKeys.key, key));

            return res.status(existingRecord.statusCode).json(existingRecord.responseBody);

        }

        const originalJson = res.json.bind(res)
        res.json = async (body) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                try {
                    await db.insert(idempotencyKeys).values({
                        key,
                        userId: req.user.id,
                        endpoint: `${req.method} ${req.originalUrl}`,
                        statusCode: res.statusCode,
                        responseBody: body,
                    }).onConflictDoNothing();
                } catch (err) {
                    console.error('Failed to save idempotency key:', err.message);
                }
            }

            return originalJson(body);
        };
        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

module.exports = {
    idempotencyMiddleware
}