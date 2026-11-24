import React from 'react';

export const ProjectEmptyState = ({ onOpenCreate }) => {
    return (
        <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No projects yet</h3>
            <p className="text-sm text-gray-500 mb-4">
                Create your first project to start managing issues and workflows.
            </p>
            <button
                onClick={onOpenCreate}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
                + Create Project
            </button>
        </div>
    );
};
