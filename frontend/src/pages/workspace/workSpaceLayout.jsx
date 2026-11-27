import React, { useState, useEffect } from 'react';
import { Outlet, useParams, NavLink, Link, Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useVerifyMembership } from '../../hooks/queries/orgMembers/userUserVerifyMember';
import { PERMISSIONS } from '../../constants/Permisson';
import { WorkspaceLayoutSkeleton } from '../../components/skeletons/WorkSpaceLayout'
const WorkspaceLayout = () => {
    const { orgSlug } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data, isLoading, isError } = useVerifyMembership(orgSlug);

    useEffect(() => {
        setSidebarOpen(false);
    }, [orgSlug]);

    if (isLoading) {
        return <WorkspaceLayoutSkeleton />;
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

    const navLinkClass = ({ isActive }) =>
        `block rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`;

    return (
        <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 lg:flex-row">
            {/* Mobile / Tablet Top Header */}
            <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
                <div className="flex min-w-0 items-center gap-2.5">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open workspace menu"
                        className="shrink-0 cursor-pointer rounded-lg border border-gray-200 p-2 text-gray-700 hover:bg-gray-100"
                    >
                        <Menu size={18} />
                    </button>
                    <span className="truncate text-base font-bold text-gray-900">
                        {membership.orgName}
                    </span>
                </div>

                {roleName && (
                    <span className="shrink-0 rounded bg-blue-50 px-2.5 py-1 text-xs font-semibold capitalize whitespace-nowrap text-blue-600">
                        {roleName}
                    </span>
                )}
            </header>

            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Left Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col justify-between border-r border-gray-200 bg-white p-5 transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0 ${sidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
                    }`}
            >
                <div className="min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <Link
                            to="/home"
                            onClick={() => setSidebarOpen(false)}
                            className="text-xs font-medium text-gray-500 whitespace-nowrap hover:text-blue-600"
                        >
                            ← All Organizations
                        </Link>
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            aria-label="Close workspace menu"
                            className="cursor-pointer rounded-lg p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="mt-3 mb-6 min-w-0">
                        <h2 className="truncate text-lg font-bold text-gray-900">{membership.orgName}</h2>
                        {roleName && (
                            <span className="mt-1 inline-block rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold capitalize whitespace-nowrap text-blue-600">
                                {roleName}
                            </span>
                        )}
                    </div>

                    <nav className="flex flex-col gap-1.5">
                        <NavLink
                            to={`/orgs/${orgSlug}/projects`}
                            onClick={() => setSidebarOpen(false)}
                            className={navLinkClass}
                        >
                            Projects
                        </NavLink>
                        <NavLink
                            to={`/orgs/${orgSlug}/members`}
                            onClick={() => setSidebarOpen(false)}
                            className={navLinkClass}
                        >
                            Team Members
                        </NavLink>
                        {canManageRoles && (
                            <NavLink
                                to={`/orgs/${orgSlug}/roles`}
                                onClick={() => setSidebarOpen(false)}
                                className={navLinkClass}
                            >
                                Roles & Permissions
                            </NavLink>
                        )}
                        {canViewLogs && (
                            <NavLink
                                to={`/orgs/${orgSlug}/audit-logs`}
                                onClick={() => setSidebarOpen(false)}
                                className={navLinkClass}
                            >
                                Audit Logs
                            </NavLink>
                        )}
                    </nav>
                </div>
            </aside>

            <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                <Outlet context={{ membership }} />
            </main>
        </div>
    );
};

export default WorkspaceLayout;