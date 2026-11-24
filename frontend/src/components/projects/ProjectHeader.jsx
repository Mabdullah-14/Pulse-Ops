import React from 'react';
import { usePermission } from '../../hooks/usePermission'
import { PERMISSIONS } from '../../constants/Permisson'
export const ProjectHeader = ({ searchQuery, setSearchQuery, onOpenCreate }) => {
    const { hasPermission } = usePermission()
    const canCreateProject = hasPermission(PERMISSIONS.PROJECT_CREATE)
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                <p className="text-sm text-gray-500">Manage your workspace projects and boards</p>
            </div>

            <div className="flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {
                    canCreateProject && (
                        <button
                            onClick={onOpenCreate}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
                        >
                            + New Project
                        </button>
                    )
                }
            </div>
        </div>
    );
};
