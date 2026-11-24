import React, { useState, useEffect } from 'react';
import { useUpdateStatus } from '../../hooks/mutations/statuses/useUpdateStatus';

export const EditStatusModal = ({ status, onClose, orgSlug, projectId }) => {
    const [formData, setFormData] = useState({
        name: '',

        position: 0,
    });

    const { mutate: updateStatus, isPending } = useUpdateStatus();

    useEffect(() => {
        if (status) {
            setFormData({
                name: status.name || '',

                position: status.position ?? 0,
            });
        }
    }, [status]);

    if (!status) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        updateStatus(
            {
                orgSlug,
                projectId,
                statusId: status.id,
                data: { ...formData, position: Number(formData.position) },
            },
            { onSuccess: () => onClose() }
        );
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Column</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Column Name *</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                            <input
                                type="number"
                                min={0}
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-4 py-2 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                        >
                            {isPending ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
