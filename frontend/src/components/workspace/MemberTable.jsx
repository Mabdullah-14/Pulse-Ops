import React from 'react';
import MemberRoleCell from './MemberRollCell';
import { useGetRoles } from '../../hooks/queries/roles/useGetRoles';

const MembersTable = ({
  members,
  orgSlug,
  currentUserId,
  canManageTeam,
  isChangingRole,
  onRoleChange,
}) => {
  const { data: rolesRes } = useGetRoles({ orgSlug });
  const allRoles = Array.isArray(rolesRes) ? rolesRes : rolesRes?.roles || rolesRes?.data || [];
  // System role (owner) ko dropdown se hide rakhein
  const assignableRoles = allRoles.filter((r) => !r.isSystem);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Member
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Role
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Joined
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {members.map((member) => {
            const isSelf = member.userId === currentUserId;

            return (
              <tr key={member.userId} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold uppercase text-blue-600">
                      {member.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {member.name}{' '}
                        {isSelf && <span className="text-xs text-gray-400">(You)</span>}
                      </div>
                      <div className="text-xs text-gray-500">{member.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <MemberRoleCell
                    member={member}
                    roles={assignableRoles}
                    canManageTeam={canManageTeam}
                    isSelf={isSelf}
                    isChangingRole={isChangingRole}
                    onRoleChange={onRoleChange}
                  />
                </td>

                <td className="px-6 py-4 text-xs text-gray-500">
                  {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
