import React, { useState, useEffect } from 'react';
import { useCreateIssue } from '../../hooks/mutations/issues/useCreateIssue';

export const CreateIssueModal = ({
    isOpen,
    onClose,
    orgSlug,
    projectId,
    statuses = [],
    defaultStatusId = '',
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'MEDIUM',
        statusId: defaultStatusId || statuses[0]?.id || '',
    });

    const { mutate: createIssue, isPending } = useCreateIssue();

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            statusId: defaultStatusId || statuses[0]?.id || '',
        }));
    }, [defaultStatusId, statuses, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        createIssue(
            { orgSlug, projectId, data: formData },
            {
                onSuccess: () => {
                    setFormData({
                        title: '',
                        description: '',
                        priority: 'MEDIUM',
                        statusId: statuses[0]?.id || '',
                    });
                    onClose();
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Issue</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title *</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Fix login redirect bug"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Column / Status *</label>
                            <select
                                required
                                value={formData.statusId}
                                onChange={(e) => setFormData({ ...formData, statusId: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            >
                                {statuses.map((st) => (
                                    <option key={st.id} value={st.id}>
                                        {st.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            >
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Add details or steps to reproduce..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
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
                            {isPending ? 'Creating...' : 'Create Issue'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
