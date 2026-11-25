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
          onClose(); // Modal band karein
        },
        onError: (err) => {
          setError(err.message || 'Failed to create organization');
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Create Organization</h2>
          {/* <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button> */}
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-200">
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

          <div className="mt-2 flex justify-end gap-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-20 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <Button type="submit" loading={isPending}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrgModal;
