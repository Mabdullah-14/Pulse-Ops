import React from 'react';
import { RoleCard } from './RoleCard';

export const RoleList = ({ roles = [], onEdit, onDelete }) => {
    if (roles.length === 0) {
        return (
            <div className="text-center py-12 bg-white border border-dashed border-gray-300 rounded-xl">
                <p className="text-sm text-gray-500">No roles found in this organization.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
