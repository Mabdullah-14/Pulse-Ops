import React from 'react';
import { RoleCard } from './RoleCard';

export const RoleList = ({ roles = [], onEdit, onDelete }) => {
    if (roles.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center sm:py-12">
                <p className="text-sm text-gray-500">
                    No roles found in this organization.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
                <RoleCard
                    key={role.id}
                    role={role}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};