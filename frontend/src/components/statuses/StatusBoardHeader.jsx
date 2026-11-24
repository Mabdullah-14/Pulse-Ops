import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { usePermission } from '../../hooks/usePermission'
import { PERMISSIONS } from '../../constants/Permisson'
export const StatusBoardHeader = ({ project, orgSlug, onOpenCreateStatus }) => {
    const { hasPermission } = usePermission()
    const canAddColumn = hasPermission(PERMISSIONS.STATUS_CREATE)
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
            <div>
                <Link
                    to={`/orgs/${orgSlug}/projects`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 mb-2 transition"
                >
                    <ArrowLeft size={14} />
                    Back to Projects
                </Link>

                <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {project?.name || 'Project Board'}
                    </h1>
                    {project?.key && (
                        <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-md uppercase border border-blue-100">
                            {project.key}
                        </span>
                    )}
                </div>
                {project?.description && (
                    <p className="text-sm text-gray-500 mt-0.5">{project.description}</p>
                )}
            </div>

            {
                canAddColumn && (
                    <button
                        onClick={onOpenCreateStatus}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer shrink-0"
                    >
                        <Plus size={16} />
                        Add Column
                    </button>
                )
            }
        </div>
    );
};
