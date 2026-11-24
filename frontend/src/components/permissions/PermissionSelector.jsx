import React from 'react';
import { ALL_PERMISSIONS } from '../../constants/Permisson';

export const PermissionSelector = ({
    selectedPermissions = [],
    onChange,
    error,
}) => {
    //for toggle single checkbox
    const handleToggle = (perm) => {
        const updated = selectedPermissions.includes(perm)
            ? selectedPermissions.filter((item) => item !== perm)
            : [...selectedPermissions, perm];

        onChange(updated);
    };

    // for select all pemssion by single click
    const handleSelectAll = () => {
        if (selectedPermissions.length === ALL_PERMISSIONS.length) {
            onChange([]);
        } else {
            onChange([...ALL_PERMISSIONS]);
        }
    };

    const isAllSelected = selectedPermissions.length === ALL_PERMISSIONS.length;

    return (
        <div>
            {/* Header + Select All Button */}
            <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                    Assign Permissions ({selectedPermissions.length}/{ALL_PERMISSIONS.length})
                </label>
                <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                    {isAllSelected ? 'Clear All' : 'Select All'}
                </button>
            </div>

            {/* Checkboxes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50/60 p-3">
                {ALL_PERMISSIONS.map((perm) => {
                    const isChecked = selectedPermissions.includes(perm);
                    return (
                        <label
                            key={perm}
                            className={`flex items-center gap-2.5 rounded-lg border p-2.5 text-xs font-medium cursor-pointer transition ${isChecked
                                    ? 'border-blue-500 bg-blue-50/70 text-blue-800'
                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggle(perm)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="capitalize">
                                {perm.replace(':', ' ').replace('_', ' ')}
                            </span>
                        </label>
                    );
                })}
            </div>

            {/* Zod Validation Error */}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};
