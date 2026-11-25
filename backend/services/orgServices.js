const { db } = require('../config/db');
const { findOrgBySlug, insertOrg } = require('../repositories/orgrepo');
const { addMemberToOrg, getUserOrgs } = require('../repositories/orgMemberrepo');
const { logActivity } = require('./auditLogsServices');
const { createRole } = require('../repositories/roleRepo');
const { OWNER_ROLE_TEMPLATE } = require('../constants/permission');
const { AUDIT_ACTIONS, ENTITY_TYPES } = require('../constants/auditAction');

const createOrganization = async ({ userId, name, slug }) => {
  const existingOrg = await findOrgBySlug(slug);
  if (existingOrg) {
    const error = new Error('Organization slug already exists');
    error.statusCode = 409;
    throw error;
  }

  return await db.transaction(async (tx) => {
    // 1. Create the organization
    const newOrg = await insertOrg({ name, slug }, tx);

    // 2. Auto-create the default system 'owner' role with all permissions
    const ownerRole = await createRole(
      {
        organizationsId: newOrg.id,
        name: OWNER_ROLE_TEMPLATE.name,
        permissions: OWNER_ROLE_TEMPLATE.permissions,
        isSystem: OWNER_ROLE_TEMPLATE.isSystem,
      },
      tx
    );

    // 3. Assign the creator as a member with the newly created owner roleId
    await addMemberToOrg(
      {
        organizationsId: newOrg.id,
        userId,
        roleId: ownerRole.id,
      },
      tx
    );

    // 4. Record audit log inside the same transaction
    await logActivity(
      {
        orgId: newOrg.id, 
        userId,
        action: AUDIT_ACTIONS.ORG_CREATED,
        entityType: ENTITY_TYPES.ORGANIZATION,
        entityId: newOrg.id,
        metadata: {
          name: newOrg.name,
          slug: newOrg.slug,
        },
      },
      tx
    );

    return newOrg;
  });
};

const getUserOrganizations = async (userId) => {
  return await getUserOrgs(userId);
};

module.exports = {
  createOrganization,
  getUserOrganizations,
};
