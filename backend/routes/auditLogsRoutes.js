const express = require('express')
const router = express.Router()
const auditLogController = require('../controller/auditLogsController');
const { authMiddleware } = require('../middleware/authMiddlware')
const { requirePermission } = require('../middleware/requirePermission')
const { PERMISSIONS } = require('../constants/permission')

router.get('/', authMiddleware, requirePermission(PERMISSIONS.AUDIT_LOG_VIEW), auditLogController.getAllLogs)

router.get('/:entityType/:entityId', authMiddleware, requirePermission(PERMISSIONS.AUDIT_LOG_VIEW), auditLogController.getEntityLogs)

module.exports = router