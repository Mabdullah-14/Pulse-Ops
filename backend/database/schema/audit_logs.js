const { pgTable, uuid, text, timestamp, jsonb } = require('drizzle-orm/pg-core');
const { organizations } = require('./organization')
const { user } = require('./users')

const auditLogs = pgTable('audit_logs', {
    id: uuid('id').primaryKey().defaultRandom(),
    orgId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
        .references(() => user.id, { onDelete: 'cascade' }),

    action: text('action').notNull(),
    entityType: text('entity_type').notNull(),
    entityId: uuid('entity_id').notNull(),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at').defaultNow().notNull()

})

module.exports = { auditLogs }