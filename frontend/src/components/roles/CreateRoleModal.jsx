import React, { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { PermissionSelector } from '../permissions/PermissionSelector';
import { roleNameSchema } from '../../validators/RoleValidators';
import { useCreateRole } from '../../hooks/mutations/roles/useCreateRole';

export const CreateRoleModal = ({ isOpen, onClose, orgSlug }) => {
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [errors, setErrors] = useState({});

    const { mutate, isPending } = useCreateRole(orgSlug);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const result = roleNameSchema.safeParse({ name, permissions });
        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        mutate(
            { data: result.data },
            {
                onSuccess: () => {
                    setName('');
                    setPermissions([]);
                    setErrors({});
                    onClose();
                },
                onError: (err) => {
                    setErrors({
                        general: err?.response?.data?.message || err?.message || 'Failed to create role',
                    });
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Create Custom Role</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                {errors.general && (
                    <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-200">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto pr-1">
                    <div>
                        <InputField
                            label="Role Name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Developer, Project Manager"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>
                        )}
                    </div>

                    <PermissionSelector
                        selectedPermissions={permissions}
                        onChange={setPermissions}
                        error={errors.permissions?.[0]}
                    />

                    <div className="mt-2 flex justify-end gap-3 pt-3 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <Button type="submit" loading={isPending}>
                            Create Role
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
