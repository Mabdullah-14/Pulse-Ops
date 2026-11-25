const { db } = require('../config/db')
const auditLogRepository = require('../repositories/auditLogsRepo')

const logActivity = async (
    { orgId, userId, action, entityType, entityId, metadata = {} },
    tx = db
) => {
    return await auditLogRepository.createAuditLog(
        {
            orgId,
            userId,
            action,
            entityType,
            entityId,
            metadata,
        },
        tx
    )
}

const getOrganizationLogs = async (orgId, limit = 10, cursor = null) => {
    const logs = await auditLogRepository.getLogsByOrganization(orgId, limit, cursor)

    const lastLog = logs[logs.length - 1]
    const nextCursor = logs.length === limit && lastLog ? lastLog.createdAt : null

    return {
        logs,
        nextCursor,
    }
}

const getEntityLogs = async (orgId, entityType, entityId) => {
    return await auditLogRepository.getLogsByEntity(orgId, entityType, entityId)
}

module.exports = {
    logActivity,
    getOrganizationLogs,
    getEntityLogs,
}
