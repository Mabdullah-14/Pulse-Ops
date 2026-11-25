const { drizzle } = require('drizzle-orm/node-postgres');
const { sql } = require('drizzle-orm');
const { Pool } = require('pg');
const { user } = require('../database/schema/users');
const { organizations } = require('../database/schema/organization');
const { organizationMembers } = require('../database/schema/organization_members');
const { organizationRoles } = require('../database/schema/orgnization_roles');
const { projects } = require('../database/schema/projects');
const { statuses } = require('../database/schema/status');
const { issues } = require('../database/schema/issues');
const { auditLogs } = require('../database/schema/audit_logs');
const { auditLogsRelations } = require('../database/schema/audit_relations');
const { idempotencyKeys } = require('../database/schema/idempotency');

const {
  organizationRelations,
  organizationMembersRelations,
  organizationRolesRelations,
  userRelations,
} = require('../database/schema/relations');
const {
  projectRelations,
  statusRelations,
  issueRelations,
} = require('../database/schema/projectRelations');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, {
  schema: {
    user,
    organizations,
    organizationMembers,
    organizationRoles,
    organizationRelations,
    organizationMembersRelations,
    organizationRolesRelations,
    userRelations,
    projects,
    statuses,
    issues,
    projectRelations,
    statusRelations,
    issueRelations,
    auditLogs,
    auditLogsRelations,
    idempotencyKeys,
  },
});

async function connectDB() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log('PostgreSQL Database Connected!');
  } catch (error) {
    console.error('Database Connection Error:', error);
    throw error;
  }
}

module.exports = { db, connectDB };
