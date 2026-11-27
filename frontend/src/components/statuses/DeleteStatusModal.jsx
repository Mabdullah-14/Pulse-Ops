import React from 'react';
import { useDeleteStatus } from '../../hooks/mutations/statuses/useDeleteStatus';

export const DeleteStatusModal = ({ status, onClose, orgSlug, projectId }) => {
    const { mutate: deleteStatus, isPending } = useDeleteStatus();

    if (!status) return null;

    const handleDelete = () => {
        deleteStatus(
            { orgSlug, projectId, statusId: status.id },
            { onSuccess: () => onClose() }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90dvh] w-full max-w-sm overflow-y-auto rounded-xl bg-white p-4 shadow-xl sm:p-6">
                <h2 className="mb-2 text-base font-bold text-gray-900 sm:text-lg">
                    Delete Column?
                </h2>
                <p className="mb-5 text-sm text-gray-600">
                    Are you sure you want to delete{' '}
                    <span className="font-semibold">{status.name}</span>? Issues inside
                    this column may lose their status.
                </p>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
                    <button
                        onClick={onClose}
                        className="w-full cursor-pointer rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 sm:w-auto sm:py-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isPending}
                        className="w-full cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 sm:w-auto sm:py-2"
                    >
                        {isPending ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};