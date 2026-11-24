import React from 'react';

const MemberRoleCell = ({
    member,
    canManageTeam,
    isSelf,
    isChangingRole,
    onRoleChange,
}) => {
    const roleLower = member.role?.toLowerCase();
    const isOwner = roleLower === 'owner';

    if (canManageTeam && !isSelf && !isOwner) {
        return (
            <select
                disabled={isChangingRole}
                value={roleLower}
                onChange={(e) => onRoleChange(member.userId, e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium capitalize text-gray-700 focus:border-blue-500 focus:outline-none"
            >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
            </select>
        );
    }

    const badgeStyle = isOwner
        ? 'bg-purple-50 text-purple-700'
        : roleLower === 'admin'
            ? 'bg-blue-50 text-blue-700'
            : 'bg-gray-100 text-gray-700';

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeStyle}`}>
            {member.role}
        </span>
    );
};

export default MemberRoleCell;
