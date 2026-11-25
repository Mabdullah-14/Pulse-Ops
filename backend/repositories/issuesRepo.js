const { eq, and, desc, asc, isNull, or, ilike, lt } = require('drizzle-orm');
const { db } = require('../config/db');
const { issues } = require('../database/schema/issues');

const getLastIssueInProject = async (projectId, tx = db) => {
  return await tx.query.issues.findFirst({
    where: eq(issues.projectId, projectId),
    orderBy: [desc(issues.issueNumber)],
  });
};

const getIssuesByStatus = async (statusId) => {
  return await db.query.issues.findMany({
    where: and(
      eq(issues.statusId, statusId),
      isNull(issues.deletedAt)
    ),
    orderBy: [asc(issues.position)],
  });
};

// 3. Project issues
const getIssuesByProject = async (projectId, filters = {}, limit = 10, cursor = null) => {
  const conditions = [
    eq(issues.projectId, projectId),
    isNull(issues.deletedAt),
  ];

  if (filters.statusId) {
    conditions.push(eq(issues.statusId, filters.statusId));
  }

  if (filters.priority) {
    conditions.push(eq(issues.priority, filters.priority));
  }

  if (filters.assigneeId) {
    conditions.push(eq(issues.assigneeId, filters.assigneeId));
  }

  if (filters.search) {
    conditions.push(
      or(
        ilike(issues.title, `%${filters.search}%`),
        ilike(issues.description, `%${filters.search}%`)
      )
    );
  }

  if (cursor) {
    conditions.push(lt(issues.createdAt, new Date(cursor)));
  }

  return await db.query.issues.findMany({
    where: and(...conditions),
    orderBy: [desc(issues.createdAt)],
    limit: limit,
  });
};

// 4. Single active issue by ID
const getIssueById = async (projectId, issueId) => {
  return await db.query.issues.findFirst({
    where: and(
      eq(issues.id, issueId),
      eq(issues.projectId, projectId),
      isNull(issues.deletedAt)
    ),
  });
};

// 5. Issue create
const createIssue = async (data, tx = db) => {
  const [newIssue] = await tx.insert(issues).values(data).returning();
  return newIssue;
};

// 6. Optimistic Locking Update (with tx support)
const updateIssueWithVersion = async (projectId, issueId, clientVersion, data, tx = db) => {
  const [updated] = await tx
    .update(issues)
    .set({
      ...data,
      version: clientVersion + 1,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(issues.id, issueId),
        eq(issues.projectId, projectId),
        eq(issues.version, clientVersion),
        isNull(issues.deletedAt)
      )
    )
    .returning();

  return updated;
};

// 7. Delete Issue
const softDeleteIssue = async (projectId, issueId, tx = db) => {
  const [deleted] = await tx
    .update(issues)
    .set({ deletedAt: new Date() })
    .where(
      and(
        eq(issues.id, issueId),
        eq(issues.projectId, projectId),
        isNull(issues.deletedAt)
      )
    )
    .returning();

  return deleted;
};

module.exports = {
  getLastIssueInProject,
  getIssuesByStatus,
  getIssuesByProject,
  getIssueById,
  createIssue,
  updateIssueWithVersion,
  softDeleteIssue,
};
