import React, { useState } from 'react';
import { useCreateStatus } from '../../hooks/mutations/statuses/useCreateStatus';

export const CreateStatusModal = ({
    isOpen,
    onClose,
    orgSlug,
    projectId,
    nextPosition = 1,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        position: nextPosition,
    });

    const { mutate: createStatus, isPending } = useCreateStatus();

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        createStatus(
            {
                orgSlug,
                projectId,
                data: { ...formData, position: Number(formData.position) },
            },
            {
                onSuccess: () => {
                    setFormData({ name: '', position: nextPosition + 1 });
                    onClose();
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-4 shadow-xl sm:p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
                    Add New Column
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Column Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. To Do, In Progress, Review"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Position
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={formData.position}
                            onChange={(e) =>
                                setFormData({ ...formData, position: e.target.value })
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end sm:gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full cursor-pointer rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 sm:w-auto sm:py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 sm:w-auto sm:py-2"
                        >
                            {isPending ? 'Creating...' : 'Create Column'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};