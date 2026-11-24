export const PERMISSIONS = {
    // Roles Permissions
    ROLE_CREATE: 'role:create',
    ROLE_UPDATE: 'role:update',
    ROLE_DELETE: 'role:delete',

    // Organization & Members Permissions
    ORG_UPDATE: 'org:update',
    ORG_DELETE: 'org:delete',
    MEMBER_ADD: 'member:add',
    MEMBER_UPDATE_ROLE: 'member:update_role',
    MEMBER_REMOVE: 'member:remove',

    // Projects & Board Statuses Permissions
    PROJECT_CREATE: 'project:create',
    PROJECT_UPDATE: 'project:update',
    PROJECT_DELETE: 'project:delete',

    STATUS_CREATE: 'status:create',          
    STATUS_UPDATE: 'status:update',           
    STATUS_DELETE: 'status:delete',          

    // Issues Permissions
    ISSUE_CREATE: 'issue:create',
    ISSUE_UPDATE_OWN: 'issue:update_own',
    ISSUE_UPDATE_ANY: 'issue:update_any',
    ISSUE_DELETE: 'issue:delete',

    // Audit Logs
    AUDIT_LOG_VIEW: 'audit_log:view',
};

// Zod validation aur checkboxes ke liye
export const ALL_PERMISSIONS = Object.values(PERMISSIONS);
