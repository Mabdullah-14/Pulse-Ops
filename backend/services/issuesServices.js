const { db } = require('../config/db');
const { getIo } = require('../config/socket');
const issueRepo = require('../repositories/issuesRepo');
const projectRepo = require('../repositories/projectsrepo');
const statusRepo = require('../repositories/statusRepo');
const { logActivity } = require('./auditLogsServices');
const { AUDIT_ACTIONS, ENTITY_TYPES } = require('../constants/auditAction');

const emitToOrg = (organizationId, eventName, payload) => {
  try {
    getIo().to(`org:${organizationId}`).emit(eventName, payload);
  } catch (error) {
    console.warn('Socket emit skipped:', error.message); // Fixed: error instead of err
  }
};

const validateProjectAndStatus = async (organizationId, projectId, statusId = null) => {
  const project = await projectRepo.getProjectById(organizationId, projectId);
  if (!project) {
    const err = new Error('Project not found in this organization');
    err.statusCode = 404;
    throw err;
  }

  if (statusId) {
    const status = await statusRepo.verifyStatusInProject(projectId, statusId);
    if (!status) {
      const err = new Error('Status column does not belong to this project');
      err.statusCode = 400;
      throw err;
    }
  }

  return project;
};

const createIssue = async (organizationId, userId, projectId, data) => {
  await validateProjectAndStatus(organizationId, projectId, data.statusId);

  // Store result in variable instead of returning immediately
  const newIssue = await db.transaction(async (tx) => {
    const lastIssue = await issueRepo.getLastIssueInProject(projectId, tx);
    const nextIssueNumber = lastIssue ? lastIssue.issueNumber + 1 : 1;

    const existingInStatus = await issueRepo.getIssuesByStatus(data.statusId);
    const nextPosition = existingInStatus.length;

    const created = await issueRepo.createIssue(
      {
        projectId,
        statusId: data.statusId,
        issueNumber: nextIssueNumber,
        title: data.title.trim(),
        description: data.description || null,
        priority: data.priority || 'MEDIUM',
        assigneeId: data.assigneeId || null,
        position: nextPosition,
      },
      tx
    );

    await logActivity(
      {
        orgId: organizationId,
        userId,
        action: AUDIT_ACTIONS.ISSUE_CREATED,
        entityType: ENTITY_TYPES.ISSUE,
        entityId: created.id,
        metadata: {
          title: created.title,
          issueNumber: created.issueNumber,
          projectId,
        },
      },
      tx
    );

    return created;
  });

  // Now runs AFTER the database transaction commits
  emitToOrg(organizationId, 'ISSUE_CREATED', {
    issue: newIssue,
    actorId: userId,
    message: `New issue #${newIssue.issueNumber} "${newIssue.title}" created`,
  });

  return newIssue;
};

// 2. Get All Issues of a Project
const getProjectIssues = async (organizationId, projectId, filters = {}, limit = 10, cursor = null) => {
  await validateProjectAndStatus(organizationId, projectId);

  const issues = await issueRepo.getIssuesByProject(projectId, filters, limit, cursor);

  const lastIssue = issues[issues.length - 1];
  let nextCursor = null;

  if (issues.length === limit && lastIssue) {
    nextCursor = lastIssue.createdAt;
  }

  return {
    issues,
    nextCursor,
  };
};

// 3. Get Single Issue by ID
const getSingleIssue = async (organizationId, projectId, issueId) => {
  await validateProjectAndStatus(organizationId, projectId);
  const issue = await issueRepo.getIssueById(projectId, issueId);
  if (!issue) {
    const err = new Error('Issue not found');
    err.statusCode = 404;
    throw err;
  }
  return issue;
};

// 4. Update Issue
const updateIssue = async (organizationId, userId, projectId, issueId, clientVersion, data) => {
  await validateProjectAndStatus(organizationId, projectId, data.statusId);

  const existingIssue = await issueRepo.getIssueById(projectId, issueId);
  if (!existingIssue) {
    const err = new Error('Issue not found');
    err.statusCode = 404;
    throw err;
  }

  // Define whether the status column changed
  const isMoved = Boolean(data.statusId && data.statusId !== existingIssue.statusId);

  const updated = await db.transaction(async (tx) => {
    const updatedIssue = await issueRepo.updateIssueWithVersion(
      projectId,
      issueId,
      clientVersion,
      data,
      tx
    );

    if (!updatedIssue) {
      const err = new Error('Conflict: This issue was modified by another user. Please refresh.');
      err.statusCode = 409;
      err.latestVersion = existingIssue.version;
      throw err;
    }

    await logActivity(
      {
        orgId: organizationId,
        userId,
        action: AUDIT_ACTIONS.ISSUE_UPDATED,
        entityType: ENTITY_TYPES.ISSUE,
        entityId: updatedIssue.id,
        metadata: {
          issueNumber: updatedIssue.issueNumber,
          updatedFields: data,
        },
      },
      tx
    );

    return updatedIssue;
  });

  const eventName = isMoved ? 'ISSUE_MOVED' : 'ISSUE_UPDATED';
  emitToOrg(organizationId, eventName, {
    issue: updated,
    actorId: userId,
    message: isMoved
      ? `Issue #${updated.issueNumber} "${updated.title}" moved to another column`
      : `Issue #${updated.issueNumber} "${updated.title}" updated`,
  });

  return updated;
};

// 5. Delete Issue
const deleteIssue = async (organizationId, userId, projectId, issueId) => {
  await validateProjectAndStatus(organizationId, projectId);

  const existingIssue = await issueRepo.getIssueById(projectId, issueId);
  if (!existingIssue) {
    const err = new Error('Issue not found');
    err.statusCode = 404;
    throw err;
  }

  const deleted = await db.transaction(async (tx) => {
    const deletedIssue = await issueRepo.softDeleteIssue(projectId, issueId, tx);

    await logActivity(
      {
        orgId: organizationId,
        userId,
        action: AUDIT_ACTIONS.ISSUE_DELETED,
        entityType: ENTITY_TYPES.ISSUE,
        entityId: issueId,
        metadata: {
          deletedIssueTitle: existingIssue.title,
          issueNumber: existingIssue.issueNumber,
          projectId,
        },
      },
      tx
    );

    return deletedIssue;
  });

  emitToOrg(organizationId, 'ISSUE_DELETED', {
    issueId,
    actorId: userId,
    message: `Issue #${existingIssue.issueNumber} "${existingIssue.title}" deleted`,
  });

  return deleted;
};

module.exports = {
  createIssue,
  getProjectIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
