import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { usePermission } from '../../hooks/usePermission';
import { PERMISSIONS } from '../../constants/Permisson';
import { useGetAuditLogs } from '../../hooks/queries/auditlogs/useGetAuditLogs';
import { AuditLogsHeader } from '../../components/auditLogs/AuditLogsHeader';
import { AuditLogsTable } from '../../components/auditLogs/AuditLogsTable';
import { AuditLogsEmptyState } from '../../components/auditLogs/AuditLogsEmptyState';

export const AuditLogsPage = () => {
    const { orgSlug } = useParams();
    const { hasPermission } = usePermission();

    const canViewAuditLogs = hasPermission(PERMISSIONS.AUDIT_LOG_VIEW);

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetAuditLogs({
        orgSlug,
        enabled: canViewAuditLogs,
    });

    if (!canViewAuditLogs) {
        return <Navigate to={`/orgs/${orgSlug}/projects`} />;
    }

    const logs = data?.pages?.flatMap((page) => page?.data || []) || [];

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading audit logs...</div>;
    }

    if (isError) {
        return (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {error?.response?.data?.message || error?.message || 'Failed to load audit logs'}
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <AuditLogsHeader />

            {logs.length === 0 ? (
                <AuditLogsEmptyState />
            ) : (
                <>
                    {/* Mobile Cards */}
                    <div className="space-y-3 md:hidden">
                        {logs.map((log) => (
                            <div
                                key={log.id}
                                className="rounded-xl border border-gray-200 bg-white p-4 shadow-2xs space-y-2"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-sm font-semibold text-gray-900">
                                        {log.action}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(log.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-600">
                                    By: <span className="font-medium text-gray-800">{log.actor?.name || log.actor?.email || 'System'}</span>
                                </p>

                                {log.target && (
                                    <p className="text-xs text-gray-500">
                                        Target: <span className="text-gray-700">{log.target}</span>
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <AuditLogsTable logs={logs} />
                    </div>

                    {hasNextPage && (
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer sm:w-auto"
                            >
                                {isFetchingNextPage ? 'Loading more...' : 'Load More Logs'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};