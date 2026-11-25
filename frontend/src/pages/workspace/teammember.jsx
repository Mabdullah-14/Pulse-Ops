import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { usePermission } from '../../hooks/usePermission';
import { PERMISSIONS } from '../../constants/Permisson';
import { useChangeRole } from '../../hooks/mutations/organization/useChangeRole';
import { useOrganizationMembers } from '../../hooks/queries/orgMembers/useOrganizationMembers';
import AddMemberModal from '../../components/workspace/AddMemberModal';
import MembersTable from '../../components/workspace/MemberTable';

const TeamMember = () => {
  const { orgSlug } = useParams();
  const { user: currentUser } = useAuth();
  const { hasPermission, membership } = usePermission();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { data, isLoading, isError, error } = useOrganizationMembers(orgSlug);
  const { mutate: changeRole, isPending: isChangingRole } = useChangeRole();

  const members = data?.data || [];

  // PBAC Permission Checks
  const canAddMember = hasPermission(PERMISSIONS.MEMBER_ADD);
  const canUpdateRole = hasPermission(PERMISSIONS.MEMBER_UPDATE_ROLE);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Ab role string ke bajaye dynamic 'roleId' (UUID) bhejenge
  const handleRoleChange = (targetUserId, newRoleId) => {
    changeRole(
      { orgSlug, userId: targetUserId, roleId: newRoleId },
      {
        onSuccess: () => showToast('Role updated successfully!'),
        onError: (err) => alert(err?.response?.data?.message || err.message || 'Failed to update role'),
      }
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage members and their access roles in <span className="font-semibold">{membership?.orgName}</span>.
          </p>
        </div>

        {canAddMember && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 cursor-pointer"
          >
            + Add Member
          </button>
        )}
      </div>

      {toastMessage && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {toastMessage}
        </div>
      )}

      {isLoading && <div className="py-10 text-center text-gray-500">Loading team members...</div>}
      {isError && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error?.message || 'Failed to load members'}
        </div>
      )}

      {!isLoading && !isError && (
        <MembersTable
          members={members}
          orgSlug={orgSlug}
          currentUserId={currentUser?.id}
          canManageTeam={canUpdateRole}
          isChangingRole={isChangingRole}
          onRoleChange={handleRoleChange}
        />
      )}

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orgSlug={orgSlug}
        onSuccessMessage={showToast}
      />
    </div>
  );
};

export default TeamMember;
