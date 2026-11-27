import React from 'react';

export const ProjectEmptyState = ({ onOpenCreate }) => {
    return (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center sm:px-6 sm:py-16">
            <h3 className="mb-1 text-base font-semibold text-gray-900 sm:text-lg">
                No projects yet
            </h3>
            <p className="mx-auto mb-4 max-w-md text-xs text-gray-500 sm:text-sm">
                Create your first project to start managing issues and workflows.
            </p>
            <button
                onClick={onOpenCreate}
                className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto sm:py-2"
            >
                + Create Project
            </button>
        </div>
    );
};