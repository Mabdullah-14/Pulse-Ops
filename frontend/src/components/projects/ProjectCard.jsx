import React, { use } from 'react';
import { Link } from 'react-router-dom';
import { usePermission } from '../../hooks/usePermission'
import { PERMISSIONS } from '../../constants/Permisson'
export const ProjectCard = ({ project, orgSlug, onEdit, onDelete }) => {
    const { hasPermission } = usePermission()
    const canEdit = hasPermission(PERMISSIONS.PROJECT_UPDATE)
    const canDelete = hasPermission(PERMISSIONS.PROJECT_DELETE)


    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-md uppercase">
                        {project.key}
                    </span>
                    <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${project.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                            }`}
                    >
                        {project.status}
                    </span>
                </div>

                <Link
                    to={`/orgs/${orgSlug}/projects/${project.id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition block mb-1"
                >
                    {project.name}
                </Link>

                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {project.description || 'No description provided.'}
                </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>{project.category || 'General'}</span>

                <div className="flex items-center gap-3">
                    {
                        canEdit && (
                            <button
                                onClick={() => onEdit(project)}
                                className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer"
                            >
                                Edit
                            </button>
                        )
                    }
                    {
                        canDelete && (
                            <button
                                onClick={() => onDelete(project)}
                                className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
                            >
                                Delete
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
