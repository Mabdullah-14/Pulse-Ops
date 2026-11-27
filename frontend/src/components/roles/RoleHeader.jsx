import React from 'react';
import { Plus } from 'lucide-react';
import { usePermission } from '../../hooks/usePermission';
import { PERMISSIONS } from '../../constants/Permisson';

export const RoleHeader = ({ onOpenCreate }) => {
    const { hasPermission } = usePermission();
    const canAddRole = hasPermission(PERMISSIONS.ROLE_CREATE);

    return (
        <div className="mb-5 flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 sm:mb-6 sm:flex-row sm:items-center">
            <div className="min-w-0">
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Roles & Permissions
                </h1>
                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                    Manage custom workspace roles and control member access
                </p>
            </div>

            {canAddRole && (
                <button
                    onClick={onOpenCreate}
                    className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto sm:py-2"
                >
                    <Plus size={16} />
                    Create Role
                </button>
            )}
        </div>
    );
};