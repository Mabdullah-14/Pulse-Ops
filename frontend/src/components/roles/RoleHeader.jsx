import React from 'react';
import { Plus } from 'lucide-react';
import { usePermission } from '../../hooks/usePermission';
import { PERMISSIONS } from '../../constants/Permisson';

export const RoleHeader = ({ onOpenCreate }) => {
    const { hasPermission } = usePermission();
    const canAddRole = hasPermission(PERMISSIONS.ROLE_CREATE);

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                    Manage custom workspace roles and control member access
                </p>
            </div>

            {canAddRole && (
                <button
                    onClick={onOpenCreate}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer shrink-0"
                >
                    <Plus size={16} />
                    Create Role
                </button>
            )}
        </div>
    );
};
