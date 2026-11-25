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
        <div className="max-w-6xl mx-auto">
            <AuditLogsHeader />

            {logs.length === 0 ? (
                <AuditLogsEmptyState />
            ) : (
                <>
                    <AuditLogsTable logs={logs} />

                    {hasNextPage && (
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
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
