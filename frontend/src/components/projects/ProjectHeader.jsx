import React from 'react';
import { usePermission } from '../../hooks/usePermission';
import { PERMISSIONS } from '../../constants/Permisson';

export const ProjectHeader = ({ searchQuery, setSearchQuery, onOpenCreate }) => {
  const { hasPermission } = usePermission();
  const canCreateProject = hasPermission(PERMISSIONS.PROJECT_CREATE);

  return (
    <div className="mb-5 flex flex-col justify-between gap-4 sm:mb-6 sm:flex-row sm:items-center">
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Projects
        </h1>
        <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
          Manage your workspace projects and boards
        </p>
      </div>

      {canCreateProject && (
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <button
            onClick={onOpenCreate}
            className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto sm:py-2"
          >
            + New Project
          </button>
        </div>
      )}
    </div>
  );
};