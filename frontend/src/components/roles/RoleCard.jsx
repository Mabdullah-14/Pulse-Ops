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
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
                {/* Top Row: Role Name + System Badge */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                            <Shield size={16} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                            {role.name}
                        </h3>
                    </div>

                    {role.isSystem && (
                        <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
                            System
                        </span>
                    )}
                </div>

                {/* Permissions Badges */}
                <div className="mt-3 mb-4">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                        Permissions ({role.permissions?.length || 0})
                    </p>
                    <PermissionBadges permissions={role.permissions} limit={6} />
                </div>
            </div>

            {/* Footer Actions (Hide for system 'owner' role) */}
            {!role.isSystem && (canEdit || canDelete) && (
                <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3 text-xs">
                    {canEdit && (
                        <button
                            onClick={() => onEdit(role)}
                            className="inline-flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium cursor-pointer"
                        >
                            <Pencil size={13} />
                            Edit
                        </button>
                    )}
                    {canDelete && (
                        <button
                            onClick={() => onDelete(role)}
                            className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 font-medium cursor-pointer"
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
