const { db } = require('../config/db');
const {
    createRole,
    getRolesByOrg,
    getRoleById,
    updateRole,
    deleteRole,
    countMembersWithRole,
} = require('../repositories/roleRepo');
const { logActivity } = require('./auditLogsServices');
const { AUDIT_ACTIONS, ENTITY_TYPES } = require('../constants/auditAction');

// Fetch all roles in the organization along with assigned member counts
const fetchOrganizationRoles = async (orgId) => {
    const roles = await getRolesByOrg(orgId);
    return roles.map((role) => ({
        id: role.id,
        name: role.name,
        permissions: role.permissions,
        isSystem: role.isSystem,
        memberCount: role.members?.length || 0,
        createdAt: role.createdAt,
    }));
};

// Create a new custom role
const createCustomRole = async ({ orgId, userId, name, permissions = [] }) => {
    const uniquePermissions = [...new Set(permissions)];

    return await db.transaction(async (tx) => {
        const newRole = await createRole(
            {
                organizationsId: orgId,
                name: name.trim(),
                permissions: uniquePermissions,
                isSystem: false,
            },
            tx
        );

        await logActivity(
            {
                orgId: orgId,
                userId,
                action: AUDIT_ACTIONS.ROLE_CREATED,
                entityType: ENTITY_TYPES.ROLE,
                entityId: newRole.id,
                metadata: {
                    roleName: newRole.name,
                    permissions: newRole.permissions,
                },
            },
            tx
        );

        return newRole;
    });
};

// Update an existing custom role's name and/or permissions
const updateCustomRole = async ({ orgId, userId, roleId, name, permissions }) => {
    const existingRole = await getRoleById(roleId, orgId);
    if (!existingRole) {
        const err = new Error('Role not found in this organization');
        err.statusCode = 404;
        throw err;
    }

    // Prevent modifying the default system 'owner' role
    if (existingRole.isSystem) {
        const err = new Error('System roles cannot be modified');
        err.statusCode = 403;
        throw err;
    }

    const updatePayload = {};
    if (name !== undefined) updatePayload.name = name.trim();
    if (permissions !== undefined) updatePayload.permissions = [...new Set(permissions)];

    return await db.transaction(async (tx) => {
        const updatedRole = await updateRole(roleId, orgId, updatePayload, tx);

        await logActivity(
            {
                orgId: orgId,
                userId,
                action: AUDIT_ACTIONS.ROLE_UPDATED,
                entityType: ENTITY_TYPES.ROLE,
                entityId: roleId,
                metadata: {
                    roleName: updatedRole.name,
                    updatedFields: updatePayload,
                },
            },
            tx
        );

        return updatedRole;
    });
};

// Delete a custom role
const deleteCustomRole = async ({ orgId, userId, roleId }) => {
    const existingRole = await getRoleById(roleId, orgId);
    if (!existingRole) {
        const err = new Error('Role not found in this organization');
        err.statusCode = 404;
        throw err;
    }

    // Prevent deleting the default system 'owner' role
    if (existingRole.isSystem) {
        const err = new Error('System roles cannot be deleted');
        err.statusCode = 403;
        throw err;
    }

    // Prevent deletion if members are currently assigned to this role
    const assignedCount = await countMembersWithRole(roleId);
    if (assignedCount > 0) {
        const err = new Error(
            `Cannot delete role "${existingRole.name}" because ${assignedCount} member(s) are assigned to it`
        );
        err.statusCode = 400;
        throw err;
    }

    return await db.transaction(async (tx) => {
        const deleted = await deleteRole(roleId, orgId, tx);

        await logActivity(
            {
                orgId: orgId,
                userId,
                action: AUDIT_ACTIONS.ROLE_DELETED,
                entityType: ENTITY_TYPES.ROLE,
                entityId: roleId,
                metadata: {
                    deletedRoleName: existingRole.name,
                },
            },
            tx
        );

        return deleted;
    });
};

module.exports = {
    fetchOrganizationRoles,
    createCustomRole,
    updateCustomRole,
    deleteCustomRole,
};
