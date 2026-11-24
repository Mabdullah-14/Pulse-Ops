import React, { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { useAddMemberToOrg } from '../../hooks/mutations/orgMembers/useAddmemberToOrg';
const AddMemberModal = ({ isOpen, onClose, orgSlug, onSuccessMessage }) => {
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('member');
    const [error, setError] = useState('');

    const { mutate: addMember, isPending } = useAddMemberToOrg();

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userId.trim()) {
            setError('User ID is required.');
            return;
        }
        setError('');

        addMember(
            { orgSlug, userId: userId.trim(), role },
            {
                onSuccess: () => {
                    setUserId('');
                    setRole('member');
                    onClose();
                    onSuccessMessage('Member added successfully!');
                },
                onError: (err) => {
                    setError(err.message || 'Failed to add member');
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Add Team Member</h2>
                    <button onClick={onClose} className="text-xl font-bold text-gray-400 hover:text-gray-600">
                        ×
                    </button>
                </div>

                {error && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-500">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <InputField
                        label="User ID (UUID)"
                        name="userId"
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Paste user UUID here..."
                    />

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="mt-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
