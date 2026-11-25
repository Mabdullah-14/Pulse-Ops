import React, { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { useAddMemberToOrg } from '../../hooks/mutations/orgMembers/useAddmemberToOrg';
import { useGetRoles } from '../../hooks/queries/roles/useGetRoles';
import { addMemberSchema } from '../../validators/OrgMemberValidators';

const AddMemberModal = ({ isOpen, onClose, orgSlug, onSuccessMessage }) => {
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState('');
    const [error, setError] = useState('');

    const { mutate: addMember, isPending } = useAddMemberToOrg();
    const { data: rolesRes, isLoading: isRolesLoading } = useGetRoles({ orgSlug });

    if (!isOpen) return null;

    const allRoles = Array.isArray(rolesRes) ? rolesRes : rolesRes?.roles || rolesRes?.data || [];
    const assignableRoles = allRoles.filter((r) => !r.isSystem);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // 1. Zod Validation
        const result = addMemberSchema.safeParse({ email, roleId });
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setError(fieldErrors.email?.[0] || fieldErrors.roleId?.[0] || 'Invalid input');
            return;
        }

        // 2. API Call ({ orgSlug, email, roleId })
        addMember(
            { orgSlug, email: result.data.email, roleId: result.data.roleId },
            {
                onSuccess: () => {
                    setEmail('');
                    setRoleId('');
                    setError('');
                    onClose();
                    onSuccessMessage?.('Member added successfully!');
                },
                onError: (err) => {
                    setError(err?.response?.data?.message || err?.message || 'Failed to add member');
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Add Team Member</h2>
                    {/* <button
                        type="button"
                        onClick={onClose}
                        className="text-xl font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        ×
                    </button> */}
                </div>

                {error && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-500">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <InputField
                        label="User Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. developer@company.com"
                    />

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Assign Role
                        </label>
                        <select
                            value={roleId}
                            onChange={(e) => setRoleId(e.target.value)}
                            disabled={isRolesLoading}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 capitalize focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">
                                {isRolesLoading ? 'Loading roles...' : 'Select a role'}
                            </option>
                            {assignableRoles.map((role) => (
                                <option key={role.id} value={role.id} className="capitalize">
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <Button type="submit" loading={isPending}>
                            Add Member
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMemberModal;
