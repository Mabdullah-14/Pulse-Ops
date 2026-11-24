const {pgEnum, pgTable, uuid, text, timestamp, integer } = require('drizzle-orm/pg-core');
const { projects } = require('./projects');
const { statuses } = require('./status');
const { user } = require('./users');
const priorityEnum = pgEnum('issue_priority', ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);

const issues = pgTable('issues', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  statusId: uuid('status_id')
    .notNull()
    .references(() => statuses.id, { onDelete: 'cascade' }),
  issueNumber: integer('issue_number').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  priority:  priorityEnum('priority').notNull().default('MEDIUM'),
  position: integer('position').notNull().default(0),
  assigneeId: uuid('assignee_id').references(() => user.id, {
    onDelete: 'set null',
  }),
  version: integer('version').notNull().default(1),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

module.exports = { issues,priorityEnum };
