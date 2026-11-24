const { pgTable, varchar, integer, jsonb, timestamp, uuid } = require('drizzle-orm/pg-core');
const { user } = require('./users');

const idempotencyKeys = pgTable('idempotency_keys', {
    key: varchar('key', { length: 255 }).primaryKey(),
    userId: uuid('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    endpoint: varchar('endpoint', { length: 255 }).notNull(),
    retryCount: integer('retry_count').default(0).notNull(),
    statusCode: integer('status_code').notNull(),
    responseBody: jsonb('response_body').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

module.exports = { idempotencyKeys };
