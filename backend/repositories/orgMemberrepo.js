const { eq, and } = require('drizzle-orm');
const { db } = require('../config/db');
const { user } = require('../database/schema/users');
const { organizations } = require('../database/schema/organization');
const { organizationMembers } = require('../database/schema/organization_members');

// Finds a registered user by their email address
const findUserByEmail = async (email) => {
  return await db.query.user.findFirst({
    where: eq(user.email, email.toLowerCase().trim()),
  });
};

// Adds a new member with a specific roleId to an organization (supports transactions)
const addMemberToOrg = async ({ organizationsId, userId, roleId }, tx = db) => {
  const [member] = await tx
    .insert(organizationMembers)
    .values({ organizationsId, userId, roleId })
    .returning();
  return member;
};

// Fetches all organizations a specific user belongs to along with their role and permissions
const getUserOrgs = async (userId) => {
  const rows = await db.query.organizationMembers.findMany({
    where: eq(organizationMembers.userId, userId),
    with: {
      organization: true,
      role: true, // Joins organization_roles to fetch role name & permissions
    },
  });

  return rows.map((row) => ({
    id: row.organization.id,
    name: row.organization.name,
    slug: row.organization.slug,
    roleId: row.roleId,
    role: row.role?.name,
    permissions: row.role?.permissions || [],
    joinedAt: row.joinedAt,
  }));
};

// Checks if a user is a member of an organization using its slug and returns membership details
const checkUserInOrgBySlug = async (slug, userId) => {
  const org = await db.query.organizations.findFirst({
    where: eq(organizations.slug, slug),
    with: {
      members: {
        where: eq(organizationMembers.userId, userId),
        with: {
          role: true, // Nested relation: fetches assigned role + permissions
        },
      },
    },
  });

  if (!org || org.members.length === 0) return null;

  const member = org.members[0];

  return {
    orgId: org.id,
    orgName: org.name,
    roleId: member.roleId,
    role: member.role?.name,
    permissions: member.role?.permissions || [],
  };
};

// Retrieves all members of a specific organization with their user details and roles
const getOrgMembers = async (orgId) => {
  const rows = await db.query.organizationMembers.findMany({
    where: eq(organizationMembers.organizationsId, orgId),
    with: {
      user: {
        columns: { id: true, name: true, email: true },
      },
      role: {
        columns: { id: true, name: true, isSystem: true },
      },
    },
  });

  return rows.map((row) => ({
    userId: row.user.id,
    name: row.user.name,
    email: row.user.email,
    roleId: row.roleId,
    role: row.role?.name,
    isSystemRole: row.role?.isSystem || false,
    joinedAt: row.joinedAt,
  }));
};

// Finds a single membership record matching both the organization ID and user ID
const getSingleMember = async (orgId, userId) => {
  return await db.query.organizationMembers.findFirst({
    where: and(
      eq(organizationMembers.organizationsId, orgId),
      eq(organizationMembers.userId, userId)
    ),
    with: {
      role: true,
    },
  });
};

// Updates the roleId of an existing member within a specific organization (supports transactions)
const changeRole = async (orgId, userId, newRoleId, tx = db) => {
  const [updated] = await tx
    .update(organizationMembers)
    .set({ roleId: newRoleId })
    .where(
      and(
        eq(organizationMembers.organizationsId, orgId),
        eq(organizationMembers.userId, userId)
      )
    )
    .returning();
  return updated || null;
};

module.exports = {
  findUserByEmail,
  addMemberToOrg,
  getUserOrgs,
  checkUserInOrgBySlug,
  getOrgMembers,
  getSingleMember,
  changeRole,
};
