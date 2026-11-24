const {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  uniqueIndex,
} = require('drizzle-orm/pg-core');
const { organizations } = require('./organization');

const projects = pgTable(
  'projects',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),

    name: text('name').notNull(),
    key: text('key').notNull(),

    description: text('description'),
    category: text('category'),
    status: text('status').default('ACTIVE').notNull(),
    budgetHours: integer('budget_hours'),
    deliveryDate: timestamp('delivery_date'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => {
    return {
      orgKeyUniqueIdx: uniqueIndex('projects_org_key_idx').on(
        table.organizationId,
        table.key
      ),
    };
  }
);

module.exports = {
  projects,
};
