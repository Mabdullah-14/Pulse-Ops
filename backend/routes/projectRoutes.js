const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const { authMiddleware } = require('../middleware/authMiddlware');
const { validateBody } = require('../middleware/validateMiddleware');
const { requirePermission } = require('../middleware/requirePermission');
const { selectiveMutationLimit } = require('../middleware/rateLimiter')
const { PERMISSIONS } = require('../constants/permission');
const { createProjectSchema, updateProjectSchema } = require('../validators/projectValidator');
const { tenantMiddleware } = require('../middleware/tenantIsolationMiddleware');

router.get(
    '/:orgSlug',
    authMiddleware,

    tenantMiddleware,
    projectController.getProjects
);

router.get(
    '/:orgSlug/:projectId',
    authMiddleware,
    tenantMiddleware,
    projectController.getProjectById
);

router.post(
    '/:orgSlug/create-project',
    authMiddleware,
    selectiveMutationLimit,
    tenantMiddleware,
    requirePermission(PERMISSIONS.PROJECT_CREATE),
    validateBody(createProjectSchema),
    projectController.createProject
);

router.patch(
    '/:orgSlug/update-project/:projectId',
    authMiddleware,
    selectiveMutationLimit,
    tenantMiddleware,
    requirePermission(PERMISSIONS.PROJECT_UPDATE),
    validateBody(updateProjectSchema),
    projectController.updateProject
);

router.delete(
    '/:orgSlug/delete-project/:projectId',
    authMiddleware,
    selectiveMutationLimit,
    tenantMiddleware,
    requirePermission(PERMISSIONS.PROJECT_DELETE),
    projectController.deleteProject
);

module.exports = router;
