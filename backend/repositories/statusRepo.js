const { eq, and, asc } = require('drizzle-orm');
const { db } = require('../config/db');
const { statuses } = require('../database/schema/status');
const { projects } = require('../database/schema/projects');

const verifyProjectInOrg = async (organizationId, projectId) => {
  return await db.query.projects.findFirst({
    where: and(
      eq(projects.id, projectId),
      eq(projects.organizationId, organizationId)
    ),
  });
};

const getStatusesByProject = async (projectId) => {
  return await db.query.statuses.findMany({
    where: eq(statuses.projectId, projectId),
    orderBy: [asc(statuses.position)],
  });
};

const getStatusById = async (projectId, statusId) => {
  return await db.query.statuses.findFirst({
    where: and(
      eq(statuses.id, statusId),
      eq(statuses.projectId, projectId)
    ),
  });
};

const createStatus = async (data, tx = db) => {
  const [newStatus] = await db.insert(statuses).values(data).returning();
  return newStatus;
};

const updateStatus = async (projectId, statusId, data, tx = db) => {
  const [updated] = await db
    .update(statuses)
    .set(data)
    .where(and(eq(statuses.id, statusId), eq(statuses.projectId, projectId)))
    .returning();
  return updated;
};

const deleteStatus = async (projectId, statusId, tx = db) => {
  const [deleted] = await db
    .delete(statuses)
    .where(and(eq(statuses.id, statusId), eq(statuses.projectId, projectId)))
    .returning();
  return deleted;
};

module.exports = {
  verifyProjectInOrg,
  getStatusesByProject,
  getStatusById,
  createStatus,
  updateStatus,
  deleteStatus,
};
