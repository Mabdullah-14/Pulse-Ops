const {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  index,
} = require('drizzle-orm/pg-core');
const {projects} =require('./projects')
const statuses = pgTable(
  'statuses',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),

    name: text('name').notNull(), 
    position: integer('position').notNull(), 

    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => {
    return {
      projectIdx: index('statuses_project_idx').on(table.projectId),
    };
  }
);

module.exports = {
  statuses,
};
