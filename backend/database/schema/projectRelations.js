const { relations } = require('drizzle-orm');
const { projects } = require('./projects');
const { statuses } = require('./status');
const { issues } = require('./issues');

const projectRelations = relations(projects, ({ many }) => ({
  statuses: many(statuses),
}));

const statusRelations = relations(statuses, ({ one, many }) => ({
  project: one(projects, {
    fields: [statuses.projectId],
    references: [projects.id],
  }),
  issues: many(issues),
}));

const issueRelations = relations(issues, ({ one }) => ({
  status: one(statuses, {
    fields: [issues.statusId],
    references: [statuses.id],
  }),
}));

module.exports = {
  projectRelations,
  statusRelations,
  issueRelations,
};
