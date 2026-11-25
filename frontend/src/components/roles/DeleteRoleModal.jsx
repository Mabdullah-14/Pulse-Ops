import React, { useState } from 'react';
import Button from '../common/Button';
import { useDeleteRole } from '../../hooks/mutations/roles/useDeleteRole';

export const DeleteRoleModal = ({ role, onClose, orgSlug }) => {
    const [error, setError] = useState('');
    const { mutate, isPending } = useDeleteRole(orgSlug);

    if (!role) return null;

    const handleDelete = () => {
        setError('');
        mutate(
            { roleId: role.id },
            {
                onSuccess: () => {
                    onClose();
                },
                onError: (err) => {
                    setError(err?.response?.data?.message || err?.message || 'Failed to delete role');
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Role</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to delete the <span className="font-semibold text-gray-900 capitalize">"{role.name}"</span> role? This action cannot be undone.
                </p>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-200">
                        {error}
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <Button
                        type="button"
                        onClick={handleDelete}
                        loading={isPending}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};
