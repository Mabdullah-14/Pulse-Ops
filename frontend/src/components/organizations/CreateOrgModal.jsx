import React, { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { useCreateOrganization } from '../../hooks/mutations/organization/useCreateOrg';

const CreateOrgModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');

  const { mutate, isPending } = useCreateOrganization();

  if (!isOpen) return null;

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setSlug(autoSlug);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      setError('Organization name and slug are required.');
      return;
    }
    setError('');

    mutate(
      { name: name.trim(), slug: slug.trim() },
      {
        onSuccess: () => {
          setName('');
          setSlug('');
          onClose();
        },
        onError: (err) => {
          setError(err.message || 'Failed to create organization');
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            Create Organization
          </h2>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            label="Organization Name"
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="e.g. PulseOps Tech"
          />

          <InputField
            label="Workspace Slug"
            name="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase())}
            placeholder="e.g. pulseops-tech"
          />

          <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto sm:py-2"
            >
              Cancel
            </button>
            <Button
              type="submit"
              loading={isPending}
              className="w-full sm:w-auto"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrgModal;