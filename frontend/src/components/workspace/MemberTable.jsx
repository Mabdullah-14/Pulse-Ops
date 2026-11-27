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
    <div className="w-full min-w-0">
      {/* Mobile Card View */}
      <div className="space-y-3 md:hidden">
        {members.map((member) => {
          const isSelf = member.userId === currentUserId;
          const formattedDate = member.joinedAt
            ? new Date(member.joinedAt).toLocaleDateString()
            : '—';

          return (
            <div
              key={member.userId}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold uppercase text-blue-600">
                  {member.name?.charAt(0) || 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-gray-900">
                    {member.name}{' '}
                    {isSelf && <span className="text-xs font-normal text-gray-400">(You)</span>}
                  </div>
                  <div className="truncate text-xs text-gray-500">{member.email}</div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
                <div className="min-w-0">
                  <MemberRoleCell
                    member={member}
                    roles={assignableRoles}
                    canManageTeam={canManageTeam}
                    isSelf={isSelf}
                    isChangingRole={isChangingRole}
                    onRoleChange={onRoleChange}
                  />
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  Joined {formattedDate}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm md:block">
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
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold uppercase text-blue-600">
                        {member.name?.charAt(0) || 'U'}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-gray-900">
                          {member.name}{' '}
                          {isSelf && <span className="text-xs text-gray-400">(You)</span>}
                        </div>
                        <div className="truncate text-xs text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <MemberRoleCell
                      member={member}
                      roles={assignableRoles}
                      canManageTeam={canManageTeam}
                      isSelf={isSelf}
                      isChangingRole={isChangingRole}
                      onRoleChange={onRoleChange}
                    />
                  </td>

                  <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                    {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersTable;