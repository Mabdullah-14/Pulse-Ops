import React from 'react';
import { usePermission } from '../../hooks/usePermission';
import { PERMISSIONS } from '../../constants/Permisson';

export const StatusEmptyState = ({ onOpenCreate }) => {
    const { hasPermission } = usePermission();
    const canCreateStatus = hasPermission(PERMISSIONS.STATUS_CREATE);

    return (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center sm:px-6 sm:py-16">
            <h3 className="mb-1 text-base font-semibold text-gray-900 sm:text-lg">
                No columns created yet
            </h3>
            <p className="mx-auto mb-4 max-w-md text-xs text-gray-500 sm:text-sm">
                Add workflow columns like To Do, In Progress, and Done to organize issues.
            </p>
            {canCreateStatus && (
                <button
                    onClick={onOpenCreate}
                    className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto sm:py-2"
                >
                    + Create First Column
                </button>
            )}
        </div>
    );
};