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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Delete Column?</h2>
                <p className="text-sm text-gray-600 mb-5">
                    Are you sure you want to delete <span className="font-semibold">{status.name}</span>?
                    Issues inside this column may lose their status.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isPending}
                        className="px-4 py-2 text-sm bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                    >
                        {isPending ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};
