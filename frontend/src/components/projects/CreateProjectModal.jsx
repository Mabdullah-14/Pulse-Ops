import React, { useState } from 'react';
import { useCreateProject } from '../../hooks/mutations/projects/useCreateProject';

export const CreateProjectModal = ({ isOpen, onClose, orgSlug }) => {
  const [formData, setFormData] = useState({
    name: '',
    key: '',
    description: '',
    category: '',
  });

  const { mutate: createProject, isPending } = useCreateProject();

  if (!isOpen) return null;

  const handleNameChange = (e) => {
    const name = e.target.value;
    const autoKey = name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 5);

    setFormData((prev) => ({ ...prev, name, key: autoKey }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject(
      { orgSlug, data: formData },
      {
        onSuccess: () => {
          setFormData({ name: '', key: '', description: '', category: '' });
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-4 shadow-xl sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
          Create New Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={handleNameChange}
              placeholder="e.g. PulseOps Web"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Project Key *
            </label>
            <input
              type="text"
              required
              maxLength={10}
              value={formData.key}
              onChange={(e) =>
                setFormData({ ...formData, key: e.target.value.toUpperCase() })
              }
              placeholder="e.g. PW"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm uppercase outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="e.g. Software, Marketing"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief overview of the project..."
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
              {isPending ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};