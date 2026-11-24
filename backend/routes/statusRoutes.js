const express = require('express');
const router = express.Router();
const statusController = require('../controller/statusController');
const { authMiddleware } = require('../middleware/authMiddlware');
const { tenantMiddleware } = require('../middleware/tenantIsolationMiddleware');
const { requirePermission } = require('../middleware/requirePermission');
const { validateBody } = require('../middleware/validateMiddleware');
const { selectiveMutationLimit } = require('../middleware/rateLimiter')
const { PERMISSIONS } = require('../constants/permission');
const { createStatusSchema, updateStatusSchema } = require('../validators/statusValidator');

router.get(
  '/:orgSlug/:projectId',
  authMiddleware,
  tenantMiddleware,
  statusController.getStatuses
);

router.post(
  '/:orgSlug/:projectId/create-status',
  authMiddleware,
  selectiveMutationLimit,
  tenantMiddleware,
  requirePermission(PERMISSIONS.STATUS_CREATE),
  validateBody(createStatusSchema),
  statusController.createStatus
);

router.patch(
  '/:orgSlug/:projectId/update-status/:statusId',
  authMiddleware,
  selectiveMutationLimit,
  tenantMiddleware,
  requirePermission(PERMISSIONS.STATUS_UPDATE),
  validateBody(updateStatusSchema),
  statusController.updateStatus
);

router.delete(
  '/:orgSlug/:projectId/delete-status/:statusId',
  authMiddleware,
  selectiveMutationLimit,
  tenantMiddleware,
  requirePermission(PERMISSIONS.STATUS_DELETE),
  statusController.deleteStatus
);

module.exports = router;
