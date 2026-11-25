const { db } = require('../config/db');
const {
  findUserByEmail,
  addMemberToOrg,
  getUserOrgs,
  checkUserInOrgBySlug,
  getOrgMembers,
  getSingleMember,
  changeRole: updateMemberRoleRepo,
} = require('../repositories/orgMemberrepo');
const { getRoleById } = require('../repositories/roleRepo');
const { logActivity } = require('./auditLogsServices');
const { AUDIT_ACTIONS, ENTITY_TYPES } = require('../constants/auditAction');

// 1. Add a member to an organization using their email and a valid roleId
const addMember = async ({ organizationsId, email, roleId, actorId }) => {
  const targetUser = await findUserByEmail(email);
  if (!targetUser) {
    const err = new Error('No registered user found with this email');
    err.statusCode = 404;
    throw err;
  }

  const existingMember = await getSingleMember(organizationsId, targetUser.id);
  if (existingMember) {
    const err = new Error('User is already a member of this organization');
    err.statusCode = 400;
    throw err;
  }

  const roleExists = await getRoleById(roleId, organizationsId);
  if (!roleExists) {
    const err = new Error('Selected role does not belong to this organization');
    err.statusCode = 400;
    throw err;
  }

  return await db.transaction(async (tx) => {
    const newMember = await addMemberToOrg(
      { organizationsId, userId: targetUser.id, roleId },
      tx
    );

    if (actorId) {
      await logActivity(
        {
          orgId: organizationsId, // ✅ 'organizationId' ko 'orgId' kar diya
          userId: actorId,
          action: AUDIT_ACTIONS.MEMBER_ADDED,
          entityType: ENTITY_TYPES.MEMBER,
          entityId: targetUser.id,
          metadata: {
            memberEmail: targetUser.email,
            assignedRole: roleExists.name,
            roleId: roleExists.id,
          },
        },
        tx
      );
    }

    return newMember;
  });
};

// 2. Fetch all organizations a user belongs to
const getUserOrganization = async (userId) => {
  return await getUserOrgs(userId);
};

// 3. Verify if a user is a member of an organization via slug
const verifyMembershipBySlug = async (slug, userId) => {
  return await checkUserInOrgBySlug(slug, userId);
};

// 4. Fetch all members of an organization
const organizationMembers = async (orgId) => {
  return await getOrgMembers(orgId);
};

// 5. Fetch single member details by orgId and userId
const getMemberdetails = async (orgId, userId) => {
  return await getSingleMember(orgId, userId);
};

// 6. Update an existing member's role
const changeRole = async (orgId, targetUserId, newRoleId, actorId) => {
  const targetMember = await getSingleMember(orgId, targetUserId);
  if (!targetMember) {
    const err = new Error('Member not found in this organization');
    err.statusCode = 404;
    throw err;
  }

  if (targetMember.role?.isSystem) {
    const err = new Error('Cannot change the role of an organization owner');
    err.statusCode = 403;
    throw err;
  }

  const validRole = await getRoleById(newRoleId, orgId);
  if (!validRole) {
    const err = new Error('Selected role does not belong to this organization');
    err.statusCode = 400;
    throw err;
  }

  return await db.transaction(async (tx) => {
    const updatedMember = await updateMemberRoleRepo(orgId, targetUserId, newRoleId, tx);

    if (actorId) {
      await logActivity(
        {
          orgId, // ✅ 'organizationId' ko 'orgId' kar diya
          userId: actorId,
          action: AUDIT_ACTIONS.MEMBER_ROLE_UPDATED,
          entityType: ENTITY_TYPES.MEMBER,
          entityId: targetUserId,
          metadata: {
            previousRole: targetMember.role?.name || 'Unknown',
            newRole: validRole.name,
          },
        },
        tx
      );
    }

    return updatedMember;
  });
};

module.exports = {
  addMember,
  getUserOrganization,
  verifyMembershipBySlug,
  organizationMembers,
  getMemberdetails,
  changeRole,
};
