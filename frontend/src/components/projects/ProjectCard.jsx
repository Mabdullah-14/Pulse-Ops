import React from 'react';
import { Link } from 'react-router-dom';
import { usePermission } from '../../hooks/usePermission';
import { PERMISSIONS } from '../../constants/Permisson';

export const ProjectCard = ({ project, orgSlug, onEdit, onDelete }) => {
    const { hasPermission } = usePermission();
    const canEdit = hasPermission(PERMISSIONS.PROJECT_UPDATE);
    const canDelete = hasPermission(PERMISSIONS.PROJECT_DELETE);

    return (
        <div className="flex min-w-0 flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
            <div className="min-w-0">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="shrink-0 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold uppercase text-blue-700">
                        {project.key}
                    </span>
                    <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${project.status === 'ACTIVE'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                    >
                        {project.status}
                    </span>
                </div>

                <Link
                    to={`/orgs/${orgSlug}/projects/${project.id}`}
                    className="mb-1 block break-words text-base font-semibold text-gray-900 transition hover:text-blue-600 sm:text-lg"
                >
                    {project.name}
                </Link>

                <p className="mb-4 line-clamp-2 text-xs text-gray-500 sm:text-sm">
                    {project.description || 'No description provided.'}
                </p>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
                <span className="truncate">{project.category || 'General'}</span>

                <div className="flex shrink-0 items-center gap-3">
                    {canEdit && (
                        <button
                            onClick={() => onEdit(project)}
                            className="cursor-pointer py-1 font-medium text-gray-600 hover:text-blue-600"
                        >
                            Edit
                        </button>
                    )}
                    {canDelete && (
                        <button
                            onClick={() => onDelete(project)}
                            className="cursor-pointer py-1 font-medium text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};