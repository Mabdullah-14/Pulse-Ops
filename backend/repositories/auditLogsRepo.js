const { db } = require('../config/db');
const { auditLogs } = require('../database/schema/audit_logs');
const { eq, desc, and, lt } = require('drizzle-orm');



const createAuditLog = async (logData, tx = db) => {
    const [newLog] = await tx.insert(auditLogs).values(logData).returning()
    return newLog;
}

const getLogsByOrganization = async (orgId, limit = 10, cursor = null) => {

    if (cursor) {
        return await db.query.auditLogs.findMany({
            where: and(
                eq(auditLogs.orgId, orgId),
                lt(auditLogs.createdAt, new Date(cursor))
            ),
            orderBy: [desc(auditLogs.createdAt)],
            limit: limit,
            with: {
                user: {
                    columns: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        })
    }

    return await db.query.auditLogs.findMany({
        where: eq(auditLogs.orgId, orgId),
        orderBy: [desc(auditLogs.createdAt)],
        limit: limit,
        with: {
            user: {
                columns: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    })


};

const getLogsByEntity = async (orgId, entityType, entityId) => {
    return await db.query.auditLogs.findMany({
        where: and(
            eq(auditLogs.orgId, orgId),
            eq(auditLogs.entityType, entityType),
            eq(auditLogs.entityId, entityId)
        ),
        orderBy: [desc(auditLogs.createdAt)],
        with: {
            user: {
                columns: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};

module.exports = {
    createAuditLog,
    getLogsByOrganization,
    getLogsByEntity,

};
