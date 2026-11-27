import React from 'react';
import { Pencil, Trash2, Shield } from 'lucide-react';
import { PermissionBadges } from '../permissions/PermissionBadges';
import { usePermission } from '../../hooks/usePermission';
import { PERMISSIONS } from '../../constants/Permisson';

export const RoleCard = ({ role, onEdit, onDelete }) => {
    const { hasPermission } = usePermission();

    const canEdit = hasPermission(PERMISSIONS.ROLE_UPDATE);
    const canDelete = hasPermission(PERMISSIONS.ROLE_DELETE);

    return (
        <div className="flex min-w-0 flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
            <div className="min-w-0">
                {/* Top Row: Role Name + System Badge */}
                <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                        <div className="shrink-0 rounded-lg bg-blue-50 p-1.5 text-blue-600">
                            <Shield size={16} />
                        </div>
                        <h3 className="break-words text-base font-semibold capitalize text-gray-900 sm:text-lg">
                            {role.name}
                        </h3>
                    </div>

                    {role.isSystem && (
                        <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                            System
                        </span>
                    )}
                </div>

                {/* Permissions Badges */}
                <div className="mb-4 mt-3 min-w-0">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                        Permissions ({role.permissions?.length || 0})
                    </p>
                    <PermissionBadges permissions={role.permissions} limit={6} />
                </div>
            </div>

            {/* Footer Actions (Hide for system 'owner' role) */}
            {!role.isSystem && (canEdit || canDelete) && (
                <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-3 text-xs">
                    {canEdit && (
                        <button
                            onClick={() => onEdit(role)}
                            className="inline-flex cursor-pointer items-center gap-1 py-1 font-medium text-gray-600 hover:text-blue-600"
                        >
                            <Pencil size={13} />
                            Edit
                        </button>
                    )}
                    {canDelete && (
                        <button
                            onClick={() => onDelete(role)}
                            className="inline-flex cursor-pointer items-center gap-1 py-1 font-medium text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={13} />
                            Delete
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};