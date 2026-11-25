import React from 'react';
import { Outlet, useParams, NavLink, Link, Navigate } from 'react-router-dom';
import { useVerifyMembership } from '../../hooks/queries/orgMembers/userUserVerifyMember';
import { PERMISSIONS } from '../../constants/Permisson';

const WorkspaceLayout = () => {
    const { orgSlug } = useParams();
    const { data, isLoading, isError } = useVerifyMembership(orgSlug);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center text-gray-500">
                Loading workspace...
            </div>
        );
    }

    if (isError || !data?.success) {
        return <Navigate to="/home" replace />;
    }

    const membership = data.data;
    const roleName = typeof membership.role === 'object' ? membership.role?.name : membership.role;
    const permissions = membership?.role?.permissions || membership?.permissions || [];

    const canManageRoles =
        permissions.includes(PERMISSIONS.ROLE_CREATE) ||
        permissions.includes(PERMISSIONS.ROLE_UPDATE) ||
        permissions.includes(PERMISSIONS.ROLE_DELETE);

    const canViewLogs = permissions.includes(PERMISSIONS.AUDIT_LOG_VIEW);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-white flex flex-col justify-between p-5">
                <div>
                    <Link to="/home" className="text-xs font-medium text-gray-500 hover:text-blue-600">
                        ← All Organizations
                    </Link>
                    <div className="mt-3 mb-6">
                        <h2 className="text-lg font-bold text-gray-900 truncate">{membership.orgName}</h2>
                        <span className="inline-block mt-1 rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold capitalize text-blue-600">
                            {roleName}
                        </span>
                    </div>

                    <nav className="flex flex-col gap-1.5">
                        <NavLink
                            to={`/orgs/${orgSlug}/projects`}
                            className={({ isActive }) =>
                                `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                        >
                            Projects
                        </NavLink>
                        <NavLink
                            to={`/orgs/${orgSlug}/members`}
                            className={({ isActive }) =>
                                `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                        >
                            Team Members
                        </NavLink>
                        {canManageRoles && (
                            <NavLink
                                to={`/orgs/${orgSlug}/roles`}
                                className={({ isActive }) =>
                                    `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                Roles & Permissions
                            </NavLink>
                        )}
                        {canViewLogs && (
                            <NavLink
                                to={`/orgs/${orgSlug}/audit-logs`}
                                className={({ isActive }) =>
                                    `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                Audit Logs
                            </NavLink>
                        )}
                    </nav>
                </div>
            </aside>

            <main className="flex-1 p-8">
                <Outlet context={{ membership }} />
            </main>
        </div>
    );
};

export default WorkspaceLayout;
