const auditLogService = require('../services/auditLogsServices')

const getAllLogs = async (req, res) => {
    try {
        const organizationId = req.tenant.orgId
        const limit = parseInt(req.query.limit, 10) || 10
        const cursor = req.query.cursor || null

        const result = await auditLogService.getOrganizationLogs(organizationId, limit, cursor)

        return res.status(200).json({
            success: true,
            data: result.logs || result,
            nextCursor: result.nextCursor || null,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch audit logs',
            error: error.message,
        })
    }
}

const getEntityLogs = async (req, res) => {
    try {
        const organizationId = req.tenant.orgId
        const { entityType, entityId } = req.params

        const logs = await auditLogService.getEntityLogs(
            organizationId,
            entityType.toUpperCase(),
            entityId
        )

        return res.status(200).json({
            success: true,
            data: logs,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch entity audit logs',
            error: error.message,
        })
    }
}

module.exports = {
    getAllLogs,
    getEntityLogs,
}
