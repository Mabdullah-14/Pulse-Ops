const {
  fetchOrganizationRoles,
  createCustomRole,
  updateCustomRole,
  deleteCustomRole,
} = require('../services/roleServices');

// GET /api/orgs/:orgSlug/roles
const getRoles = async (req, res) => {
  try {
    const { orgId } = req.tenant;
    const roles = await fetchOrganizationRoles(orgId);
    return res.status(200).json({ success: true, roles });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch roles',
    });
  }
};

// POST /api/orgs/:orgSlug/roles
const createRole = async (req, res) => {
  try {
    const { orgId } = req.tenant;
    const { name, permissions } = req.body;

    const role = await createCustomRole({
      orgId,
      name,
      permissions: permissions || [],
    });

    return res.status(201).json({
      success: true,
      message: 'Role created successfully',
      role,
    });
  } catch (error) {
    // Handle duplicate role name inside the same organization
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: `A role named "${req.body.name}" already exists in this organization`,
      });
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to create role',
    });
  }
};

// PATCH /api/orgs/:orgSlug/roles/:roleId
const updateRole = async (req, res) => {
  try {
    const { orgId } = req.tenant;
    const { roleId } = req.params;
    const { name, permissions } = req.body;

    const updatedRole = await updateCustomRole({
      orgId,
      roleId,
      name,
      permissions,
    });

    return res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      role: updatedRole,
    });
  } catch (error) {
    // Handle duplicate role name inside the same organization
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: `A role named "${req.body.name}" already exists in this organization`,
      });
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to update role',
    });
  }
};

// DELETE /api/orgs/:orgSlug/roles/:roleId
const deleteRole = async (req, res) => {
  try {
    const { orgId } = req.tenant;
    const { roleId } = req.params;

    await deleteCustomRole({ orgId, roleId });

    return res.status(200).json({
      success: true,
      message: 'Role deleted successfully',
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to delete role',
    });
  }
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
};
