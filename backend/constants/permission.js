const PERMISSIONS = {
    // Roles Permissions
    ROLE_CREATE: 'role:create',             // Create new custom roles
    ROLE_UPDATE: 'role:update',             // Edit role names and permissions
    ROLE_DELETE: 'role:delete',             // Delete custom roles

    // Organization & Members Permissions
    ORG_UPDATE: 'org:update',
    ORG_DELETE: 'org:delete',               // Delete the organization
    MEMBER_ADD: 'member:add',               // Add/invite new members to the organization
    MEMBER_UPDATE_ROLE: 'member:update_role', // Change a member's assigned role
    MEMBER_REMOVE: 'member:remove',         // Remove members from the organization

    // Projects & Board Statuses Permissions
    PROJECT_CREATE: 'project:create',       // Create new projects
    PROJECT_UPDATE: 'project:update',       // Edit project details and board columns
    PROJECT_DELETE: 'project:delete',       // Delete projects

    STATUS_CREATE: 'status:create',           // Create new board columns
    STATUS_UPDATE: 'status:update',           // Edit or reorder board columns
    STATUS_DELETE: 'status:delete',           // Delete board columns


    // Issues Permissions
    ISSUE_CREATE: 'issue:create',           // Create new issues/tickets
    ISSUE_UPDATE_OWN: 'issue:update_own',   // Update issues assigned to the user
    ISSUE_UPDATE_ANY: 'issue:update_any',   // Update or reassign any issue
    ISSUE_DELETE: 'issue:delete',           // Delete issues

    AUDIT_LOG_VIEW: 'audit_log:view',         // View organization audit logs
};

// Array of all valid permissions (used for Zod validation & UI checkboxes)
const ALL_PERMISSIONS = Object.values(PERMISSIONS);

// Default system role automatically created when a new organization is initialized
const OWNER_ROLE_TEMPLATE = {
    name: 'owner',
    permissions: ALL_PERMISSIONS,
    isSystem: true,
};

module.exports = {
    PERMISSIONS,
    ALL_PERMISSIONS,
    OWNER_ROLE_TEMPLATE,
};
