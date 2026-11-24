const { db } = require('../config/db');
const {
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

// 1. Add member into an organization with a valid roleId
const addMember = async ({ organizationsId, userId, roleId, actorId }, tx = db) => {
  // Verify the role belongs to this organization
  const roleExists = await getRoleById(roleId, organizationsId);
  if (!roleExists) {
    const err = new Error('Selected role does not belong to this organization');
    err.statusCode = 400;
    throw err;
  }

  const newMember = await addMemberToOrg({ organizationsId, userId, roleId }, tx);

  await logActivity(
    {
      organizationId: organizationsId,
      userId:  userId, 
      action: AUDIT_ACTIONS.MEMBER_ADDED,
      entityType: ENTITY_TYPES.MEMBER,
      entityId: userId, 
      metadata: {
        assignedRole: roleExists.name,
        roleId: roleExists.id,
      },
    },
    tx
  );

  return newMember;
};

// 2. Find user organizations through userId
const getUserOrganization = async (userId) => {
  return await getUserOrgs(userId);
};

// 3. Verify if user is a member via slug
const verifyMembershipBySlug = async (slug, userId) => {
  return await checkUserInOrgBySlug(slug, userId);
};

// 4. Find all members of an organization
const organizationMembers = async (orgId) => {
  return await getOrgMembers(orgId);
};

// 5. Find single member by orgId and userId
const getMemberdetails = async (orgId, userId) => {
  return await getSingleMember(orgId, userId);
};

// 6. Change member role
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

    await logActivity(
      {
        organizationId: orgId,
        userId: userId, 
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
