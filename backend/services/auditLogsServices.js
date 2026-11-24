const auditLogRepository = require('../repositories/auditLogsRepo');


const logActivity = async (
    { organizationId, userId, action, entityType, entityId, metadata = {} },
    tx = db
) => {
    return await auditLogRepository.createAuditLog(
        {
            organizationId,
            userId,
            action,
            entityType,
            entityId,
            metadata,
        },
        tx
    );
};

const getOrganizationLogs = async (organizationId,limit=10,cursor=null) => {
    const logs=  await auditLogRepository.getLogsByOrganization(organizationId);

    const lastLog=logs[logs.length-1]
    const nextCursor=logs.length === limit && lastLog ? lastLog.createdAt : null

    return {
        logs,
        nextCursor
    }
};

const getEntityLogs = async (organizationId, entityType, entityId) => {
    return await auditLogRepository.getLogsByEntity(organizationId, entityType, entityId);
};

module.exports = {
    logActivity,
    getOrganizationLogs,
    getEntityLogs,
};
