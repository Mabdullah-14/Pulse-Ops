import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRoles } from '../../hooks/queries/roles/useGetRoles';
import { RoleHeader } from '../../components/roles/RoleHeader';
import { RoleList } from '../../components/roles/RoleList';
import { CreateRoleModal } from '../../components/roles/CreateRoleModal';
import { EditRoleModal } from '../../components/roles/EditRoleModal';
import { DeleteRoleModal } from '../../components/roles/DeleteRoleModal';

export const RolesPage = () => {
    const { orgSlug } = useParams();

    const { data: rolesRes, isLoading, isError } = useGetRoles({ orgSlug });

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [deletingRole, setDeletingRole] = useState(null);

    const roles = Array.isArray(rolesRes)
        ? rolesRes
        : rolesRes?.roles || rolesRes?.data || [];

    if (isLoading) {
        return (
            <div className="px-4 py-8 text-center text-sm text-gray-500 sm:p-8">
                Loading roles...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="px-4 py-8 text-center text-sm text-red-500 sm:p-8">
                Failed to load roles.
            </div>
        );
    }

    return (
        <div className="mx-auto min-w-0 max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            <RoleHeader onOpenCreate={() => setIsCreateOpen(true)} />

            <div className="mt-4 min-w-0 sm:mt-6">
                <RoleList
                    roles={roles}
                    onEdit={(role) => setEditingRole(role)}
                    onDelete={(role) => setDeletingRole(role)}
                />
            </div>

            <CreateRoleModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                orgSlug={orgSlug}
            />

            <EditRoleModal
                role={editingRole}
                onClose={() => setEditingRole(null)}
                orgSlug={orgSlug}
            />

            <DeleteRoleModal
                role={deletingRole}
                onClose={() => setDeletingRole(null)}
                orgSlug={orgSlug}
            />
        </div>
    );
};