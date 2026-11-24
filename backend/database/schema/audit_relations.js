const { relations } = require('drizzle-orm')
const { user } = require('./users')
const { organizations } = require('./organization')
const { auditLogs } = require('./audit_logs')
const auditLogsRelations = relations(auditLogs, ({ one }) => ({
    organization: one(organizations, {
        fields: [auditLogs.organizationId],
        references: [organizations.id],
    }),
    user: one(user, {
        fields: [auditLogs.userId],
        references: [user.id],
    }),
}));
module.exports = {
    auditLogsRelations
}