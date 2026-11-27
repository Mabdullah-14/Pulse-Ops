import React, { useState, useEffect } from 'react';
import { useUpdateIssue } from '../../hooks/mutations/issues/useUpdateIssue';

export const EditIssueModal = ({
    issue,
    onClose,
    orgSlug,
    projectId,
    statuses = [],
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        statusId: '',
        priority: 'MEDIUM',
    });

    const { mutate: updateIssue, isPending } = useUpdateIssue();

    useEffect(() => {
        if (issue) {
            setFormData({
                title: issue.title || '',
                description: issue.description || '',
                statusId: issue.statusId || '',
                priority: issue.priority || 'MEDIUM',
            });
        }
    }, [issue]);

    if (!issue) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        updateIssue(
            {
                orgSlug,
                projectId,
                issueId: issue.id,
                data: { ...formData, version: issue.version },
            },
            { onSuccess: () => onClose() }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-4 shadow-xl sm:p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
                    Edit Issue
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Title *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Move to Column
                            </label>
                            <select
                                value={formData.statusId}
                                onChange={(e) =>
                                    setFormData({ ...formData, statusId: e.target.value })
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            >
                                {statuses.map((st) => (
                                    <option key={st.id} value={st.id}>
                                        {st.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Priority
                            </label>
                            <select
                                value={formData.priority}
                                onChange={(e) =>
                                    setFormData({ ...formData, priority: e.target.value })
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            >
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                                <option value="URGENT">URGENT</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
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
                            {isPending ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};