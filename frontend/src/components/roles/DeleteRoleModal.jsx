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
                    setError(
                        err?.response?.data?.message ||
                        err?.message ||
                        'Failed to delete role'
                    );
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:p-6">
                <h2 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">
                    Delete Role
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                    Are you sure you want to delete the{' '}
                    <span className="font-semibold capitalize text-gray-900">
                        "{role.name}"
                    </span>{' '}
                    role? This action cannot be undone.
                </p>

                {error && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-500">
                        {error}
                    </div>
                )}

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto sm:py-2"
                    >
                        Cancel
                    </button>
                    <Button
                        type="button"
                        onClick={handleDelete}
                        loading={isPending}
                        className="w-full bg-red-600 text-white hover:bg-red-700 sm:w-auto"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};