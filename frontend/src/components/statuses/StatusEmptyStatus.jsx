import React from 'react';
import { usePermission } from '../../hooks/usePermission';
import { PERMISSIONS } from '../../constants/Permisson';

export const StatusEmptyState = ({ onOpenCreate }) => {
    const { hasPermission } = usePermission();
    const canCreateStatus = hasPermission(PERMISSIONS.STATUS_CREATE);

    return (
        <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No columns created yet</h3>
            <p className="text-sm text-gray-500 mb-4">
                Add workflow columns like To Do, In Progress, and Done to organize issues.
            </p>
            {canCreateStatus && (
                <button
                    onClick={onOpenCreate}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                    + Create First Column
                </button>
            )}
        </div>
    );
};
