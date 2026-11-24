const { pgTable, uuid, text, jsonb, boolean, timestamp, uniqueIndex } = require('drizzle-orm/pg-core');
const { organizations } = require('./organization');

const organizationRoles = pgTable('organization_roles', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationsId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    permissions: jsonb('permissions').default([]).notNull(),
    isSystem: boolean('is_system').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
    return {
        orgRoleNameIdx: uniqueIndex('org_role_name_idx').on(table.organizationsId, table.name),
    };
});

module.exports = { organizationRoles };
