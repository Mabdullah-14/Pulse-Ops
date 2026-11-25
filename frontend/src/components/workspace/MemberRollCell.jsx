import React from 'react';

const MemberRoleCell = ({
    member,
    roles = [],
    canManageTeam,
    isSelf,
    isChangingRole,
    onRoleChange,
}) => {
    const isSystemOwner = member.isSystemRole || member.role?.toLowerCase() === 'owner';

    if (canManageTeam && !isSelf && !isSystemOwner) {
        return (
            <select
                disabled={isChangingRole}
                value={member.roleId || ''}
                onChange={(e) => onRoleChange(member.userId, e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium capitalize text-gray-700 focus:border-blue-500 focus:outline-none cursor-pointer"
            >
                {roles.map((role) => (
                    <option key={role.id} value={role.id} className="capitalize">
                        {role.name}
                    </option>
                ))}
            </select>
        );
    }

    const badgeStyle = isSystemOwner
        ? 'bg-purple-50 text-purple-700'
        : 'bg-blue-50 text-blue-700';

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeStyle}`}>
            {member.role}
        </span>
    );
};

export default MemberRoleCell;
