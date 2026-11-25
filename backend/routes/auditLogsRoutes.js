const express = require('express')
const router = express.Router({ mergeParams: true })
const auditLogController = require('../controller/auditLogsController')
const { authMiddleware } = require('../middleware/authMiddlware')
const { tenantMiddleware } = require('../middleware/tenantIsolationMiddleware')
const { requirePermission } = require('../middleware/requirePermission')
const { PERMISSIONS } = require('../constants/permission')

// Fetch paginated & filtered organization audit logs
router.get(
    '/:orgSlug/get-audit-logs',
    authMiddleware,
    tenantMiddleware,
    requirePermission(PERMISSIONS.AUDIT_LOG_VIEW),
    auditLogController.getAllLogs
)

router.get(
    '/:orgSlug/:entityType/:entityId',
    authMiddleware,
    tenantMiddleware,
    requirePermission(PERMISSIONS.AUDIT_LOG_VIEW),
    auditLogController.getEntityLogs
)

module.exports = router
