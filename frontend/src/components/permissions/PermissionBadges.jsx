import React from 'react';

export const PermissionBadges = ({ permissions = [], limit = 6 }) => {
    if (!permissions || permissions.length === 0) {
        return <span className="text-xs text-gray-400">No permissions assigned</span>;
    }

    const visiblePermissions = permissions.slice(0, limit);
    const remainingCount = permissions.length - limit;

    return (
        <div className="flex flex-wrap gap-1.5">
            {visiblePermissions.map((perm) => (
                <span
                    key={perm}
                    className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 border border-blue-100 capitalize"
                >
                    {perm.replace(':', ' ').replace('_', ' ')}
                </span>
            ))}

            {remainingCount > 0 && (
                <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                    +{remainingCount} more
                </span>
            )}
        </div>
    );
};
