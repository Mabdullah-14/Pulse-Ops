import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { PermissionSelector } from '../permissions/PermissionSelector';
import { roleNameSchema } from '../../validators/RoleValidators';
import { useUpdateRole } from '../../hooks/mutations/roles/useUpdateRole';

export const EditRoleModal = ({ role, onClose, orgSlug }) => {
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [errors, setErrors] = useState({});

    const { mutate, isPending } = useUpdateRole(orgSlug);

    useEffect(() => {
        if (role) {
            setName(role.name || '');
            setPermissions(role.permissions || []);
            setErrors({});
        }
    }, [role]);

    if (!role) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const result = roleNameSchema.safeParse({ name, permissions });
        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        mutate(
            { roleId: role.id, data: result.data },
            {
                onSuccess: () => {
                    onClose();
                },
                onError: (err) => {
                    setErrors({
                        general:
                            err?.response?.data?.message ||
                            err?.message ||
                            'Failed to update role',
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
                        Edit Role
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
                            placeholder="Role name"
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
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};