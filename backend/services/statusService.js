const statusRepo = require('../repositories/statusRepo');

const { logActivity } = require('./auditLogsServices')
const { AUDIT_ACTIONS, ENTITY_TYPES } = require('../constants/auditAction');
const { db } = require('../config/db');

const createStatus = async (organizationId, projectId, data) => {
  const project = await statusRepo.verifyProjectInOrg(organizationId, projectId);
  if (!project) {
    throw new Error('PROJECT_NOT_FOUND');
  }

  const existingStatuses = await statusRepo.getStatusesByProject(projectId);
  const nextPosition = existingStatuses.length;

  return await db.transaction(async (tx) => {
    const newStatus = await statusRepo.createStatus(
      {
        projectId,
        name: data.name.trim(),
        position: nextPosition,
      },
      tx

    )
    await logActivity({
      organizationId,
      userId,
      action: AUDIT_ACTIONS.STATUS_CREATED,
      entityType: ENTITY_TYPES.STATUS,
      entityId: newStatus.id,
      metadata: {
        name: newStatus.name,
        projectId,
      },
    },
      tx
    )
    return newStatus
  })

};

const getStatuses = async (organizationId, projectId) => {
  const project = await statusRepo.verifyProjectInOrg(organizationId, projectId);
  if (!project) {
    throw new Error('PROJECT_NOT_FOUND');
  }

  return await statusRepo.getStatusesByProject(projectId);
};

const updateStatus = async (organizationId, userId, projectId, statusId, data) => {
  const project = await statusRepo.verifyProjectInOrg(organizationId, projectId);
  if (!project) {
    throw new Error('PROJECT_NOT_FOUND');
  }

  const updatePayload = {};
  if (data.name !== undefined) updatePayload.name = data.name.trim();
  if (data.position !== undefined) updatePayload.position = data.position;

  return await db.transaction(async (tx) => {
    const updated = await statusRepo.updateStatus(projectId, statusId, updatePayload, tx);
    if (!updated) {
      throw new Error('STATUS_NOT_FOUND');
    }

    await logActivity(
      {
        organizationId,
        userId,
        action: AUDIT_ACTIONS.STATUS_UPDATED,
        entityType: ENTITY_TYPES.STATUS,
        entityId: updated.id,
        metadata: {
          name: updated.name,
          projectId,
          updatedFields: updatePayload,
        },
      },
      tx
    );

    return updated;
  });
};

const deleteStatus = async (organizationId, userId, projectId, statusId) => {
  const project = await statusRepo.verifyProjectInOrg(organizationId, projectId);
  if (!project) {
    throw new Error('PROJECT_NOT_FOUND');
  }

  return await db.transaction(async (tx) => {
    const deleted = await statusRepo.deleteStatus(projectId, statusId, tx);
    if (!deleted) {
      throw new Error('STATUS_NOT_FOUND');
    }

    await logActivity(
      {
        organizationId,
        userId,
        action: AUDIT_ACTIONS.STATUS_DELETED,
        entityType: ENTITY_TYPES.STATUS,
        entityId: statusId,
        metadata: {
          deletedColumnName: deleted.name,
          projectId,
        },
      },
      tx
    );

    return deleted;
  });
};
module.exports = {
  createStatus,
  getStatuses,
  updateStatus,
  deleteStatus,
};
