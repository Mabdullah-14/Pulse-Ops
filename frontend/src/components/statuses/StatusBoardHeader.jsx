import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { usePermission } from '../../hooks/usePermission';
import { PERMISSIONS } from '../../constants/Permisson';

export const StatusBoardHeader = ({ project, orgSlug, onOpenCreateStatus }) => {
    const { hasPermission } = usePermission();
    const canAddColumn = hasPermission(PERMISSIONS.STATUS_CREATE);

    return (
        <div className="mb-5 flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 sm:mb-6 sm:flex-row sm:items-center">
            <div className="min-w-0">
                <Link
                    to={`/orgs/${orgSlug}/projects`}
                    className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-blue-600"
                >
                    <ArrowLeft size={14} />
                    Back to Projects
                </Link>

                <div className="flex flex-wrap items-center gap-2">
                    <h1 className="truncate text-xl font-bold text-gray-900 sm:text-2xl">
                        {project?.name || 'Project Board'}
                    </h1>
                    {project?.key && (
                        <span className="shrink-0 rounded-md border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold uppercase text-blue-700">
                            {project.key}
                        </span>
                    )}
                </div>

                {project?.description && (
                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        {project.description}
                    </p>
                )}
            </div>

            {canAddColumn && (
                <button
                    onClick={onOpenCreateStatus}
                    className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto sm:py-2"
                >
                    <Plus size={16} />
                    Add Column
                </button>
            )}
        </div>
    );
};