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
                        general:
                            err?.response?.data?.message ||
                            err?.message ||
                            'Failed to create role',
                    });
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="flex max-h-[90dvh] w-full max-w-lg flex-col rounded-2xl bg-white p-4 shadow-xl sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Create Custom Role
                    </h2>
                </div>

                {errors.general && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-500">
                        {errors.general}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 overflow-y-auto pr-1"
                >
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

                    <div className="mt-2 flex flex-col-reverse gap-2 border-t border-gray-100 pt-3 sm:flex-row sm:justify-end sm:gap-3">
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
                            Create Role
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};