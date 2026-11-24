const express = require('express');
const router = express.Router();
const issueController = require('../controller/issuesController');
const { authMiddleware } = require('../middleware/authMiddlware');
const { tenantMiddleware } = require('../middleware/tenantIsolationMiddleware');
const { requirePermission } = require('../middleware/requirePermission');
const { PERMISSIONS } = require('../constants/permission');
const { validateBody } = require('../middleware/validateMiddleware');
const { selectiveMutationLimit } = require('../middleware/rateLimiter')
const { idempotencyMiddleware } = require('../middleware/idempotencyMiddleware')
const { createIssueSchema, updateIssueSchema } = require('../validators/issueValidator');

router.get(
    '/:orgSlug/:projectId',
    authMiddleware,
    tenantMiddleware,
    issueController.getIssues
);

router.get(
    '/:orgSlug/:projectId/:issueId',
    authMiddleware,
    tenantMiddleware,
    issueController.getIssueById
);

router.post(
    '/:orgSlug/:projectId/create-issue',
    authMiddleware,
    selectiveMutationLimit,
    tenantMiddleware,
    requirePermission(PERMISSIONS.ISSUE_CREATE),
    validateBody(createIssueSchema),
    idempotencyMiddleware,
    issueController.createIssue
);

router.patch(
    '/:orgSlug/:projectId/update-issue/:issueId',
    authMiddleware,
    selectiveMutationLimit,
    tenantMiddleware,
    validateBody(updateIssueSchema),
    issueController.updateIssue
);

router.delete(
    '/:orgSlug/:projectId/delete-issue/:issueId',
    authMiddleware,
    selectiveMutationLimit,
    tenantMiddleware,
    requirePermission(PERMISSIONS.ISSUE_DELETE),
    issueController.deleteIssue
);

module.exports = router;
