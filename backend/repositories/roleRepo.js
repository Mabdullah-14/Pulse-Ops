const { eq, and, count } = require('drizzle-orm')
const { db } = require('../config/db')
const { organizationRoles } = require('../database/schema/orgnization_roles')
const { organizationMembers } = require('../database/schema/organization_members')


//create a role in organization 
const createRole = async ({ organizationsId, name, permissions = [], isSystem = false }, tx = db) => {
    const [newRole] = await tx
        .insert(organizationRoles)
        .values({ organizationsId, name, permissions, isSystem })
        .returning();
    return newRole;
}


//get roles by organiations
const getRolesByOrg = async (orgId) => {
    return await db.query.organizationRoles.findMany({
        where: eq(organizationRoles.organizationsId, orgId),
        with: {
            members: {
                columns: { userId: true },
            },
        },
    });
};

//get a role by id 

const getRoleById = async (roleId, orgId) => {
    return await db.query.organizationRoles.findFirst({
        where: and(
            eq(organizationRoles.id, roleId),
            eq(organizationRoles.organizationsId, orgId)
        ),
    });
};


//update a role id
const updateRole = async (roleId, orgId, updateData) => {
    const [updatedRole] = await db
        .update(organizationRoles)
        .set(updateData)
        .where(
            and(
                eq(organizationRoles.id, roleId),
                eq(organizationRoles.organizationsId, orgId)
            )
        )
        .returning();
    return updatedRole || null;
};


//delete a role
const deleteRole = async (roleId, orgId) => {
    const [deletedRole] = await db
        .delete(organizationRoles)
        .where(
            and(
                eq(organizationRoles.id, roleId),
                eq(organizationRoles.organizationsId, orgId)
            )
        )
        .returning();
    return deletedRole || null;
};


// total roles in an organizaton
const countMembersWithRole = async (roleId) => {
    const [result] = await db
        .select({ value: count() })
        .from(organizationMembers)
        .where(eq(organizationMembers.roleId, roleId));
    return Number(result?.value || 0);
};

module.exports = {
    createRole,
    getRolesByOrg,
    getRoleById,
    updateRole,
    deleteRole,
    countMembersWithRole,
};