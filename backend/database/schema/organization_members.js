const { pgTable, uuid, timestamp, primaryKey } = require('drizzle-orm/pg-core');
const { user } = require('./users');
const { organizations } = require('./organization');
const { organizationRoles } = require('./orgnization_roles');

const organizationMembers = pgTable('organization_members', {
    organizationsId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    roleId: uuid('role_id')
        .notNull()
        .references(() => organizationRoles.id, { onDelete: 'restrict' }),
    joinedAt: timestamp('joined_at').defaultNow().notNull(),
}, (table) => {
    return {
        pk: primaryKey({
            columns: [table.organizationsId, table.userId],
        }),
    };
});

module.exports = { organizationMembers };
