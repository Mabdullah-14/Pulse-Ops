const express = require('express');
const router = express.Router({ mergeParams: true });
const { authMiddleware } = require('../middleware/authMiddlware');
const { tenantMiddleware } = require('../middleware/tenantIsolationMiddleware');
const { requirePermission } = require('../middleware/requirePermission');
const { validateBody } = require('../middleware/validateMiddleware');
const { selectiveMutationLimit } = require('../middleware/rateLimiter')
const { roleNameSchema, updateRoleSchema } = require('../validators/roleValidators');
const { PERMISSIONS } = require('../constants/permission');
const {
    getRoles,
    createRole,
    updateRole,
    deleteRole,
} = require('../controller/roleController');

// Fetch all roles in the organization
router.get('/:orgSlug/get-roles', authMiddleware, tenantMiddleware, getRoles);

// Create a new custom role
router.post(
    '/:orgSlug/create-role',
    authMiddleware,
    selectiveMutationLimit,
    tenantMiddleware,
    requirePermission(PERMISSIONS.ROLE_CREATE),
    validateBody(roleNameSchema),
    createRole
);

// Update a custom role's permissions
router.patch(
    '/:orgSlug/update-role/:roleId',
    authMiddleware,
    selectiveMutationLimit,
    tenantMiddleware,
    requirePermission(PERMISSIONS.ROLE_UPDATE),
    validateBody(updateRoleSchema),
    updateRole
);

// Delete a custom role
router.delete(
    '/:orgSlug/delete-role/:roleId',
    authMiddleware,
    selectiveMutationLimit,
    tenantMiddleware,
    requirePermission(PERMISSIONS.ROLE_DELETE),
    deleteRole
);

module.exports = router;
