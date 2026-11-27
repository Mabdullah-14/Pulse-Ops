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

  const canAddMember = hasPermission(PERMISSIONS.MEMBER_ADD);
  const canUpdateRole = hasPermission(PERMISSIONS.MEMBER_UPDATE_ROLE);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

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
    <div className="mx-auto w-full max-w-5xl min-w-0">
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Team Members</h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Manage members and their access roles in{' '}
            <span className="font-semibold text-gray-700">{membership?.orgName}</span>.
          </p>
        </div>

        {canAddMember && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full shrink-0 cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
          >
            + Add Member
          </button>
        )}
      </div>

      {toastMessage && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-700 sm:text-sm">
          {toastMessage}
        </div>
      )}

      {isLoading && (
        <div className="py-10 text-center text-sm text-gray-500">Loading team members...</div>
      )}

      {isError && (
        <div className="rounded-lg bg-red-50 p-4 text-xs text-red-600 sm:text-sm">
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