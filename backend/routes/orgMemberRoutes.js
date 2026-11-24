const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddlware');
const { validateBody } = require('../middleware/validateMiddleware');
const { addMemberSchema, changeRoleSchema } = require('../validators/orgMemberValidator');
const { tenantMiddleware } = require('../middleware/tenantIsolationMiddleware');
const {selectiveMutationLimit} = require('../middleware/rateLimiter')
const { requirePermission } = require('../middleware/requirePermission');
const { PERMISSIONS } = require('../constants/permission');
const {
    handleAddMember,
    handleGetUserOrgnaizations,
    handleVerifyMembershipBySlug,
    handleOrganizationMembers,
    handleGetMembersDetails,
    handleChangeRole,
} = require('../controller/orgMemberController');

router.post(
    '/:orgSlug/add-member',
    authMiddleware,
    selectiveMutationLimit,
    tenantMiddleware,
    requirePermission(PERMISSIONS.MEMBER_ADD),
    validateBody(addMemberSchema),
    handleAddMember
);

router.get('/user-org', authMiddleware, handleGetUserOrgnaizations);

router.get('/verify-member/:slug', authMiddleware, handleVerifyMembershipBySlug);

router.get('/:orgSlug/org-member-list', authMiddleware, tenantMiddleware, handleOrganizationMembers);

router.get('/:orgSlug/members-details/:userId', authMiddleware, tenantMiddleware, handleGetMembersDetails);

router.patch(
    '/:orgSlug/change-role/:userId',
    authMiddleware,
    tenantMiddleware,
    requirePermission(PERMISSIONS.MEMBER_UPDATE_ROLE),
    validateBody(changeRoleSchema),
    handleChangeRole
);

module.exports = router;
