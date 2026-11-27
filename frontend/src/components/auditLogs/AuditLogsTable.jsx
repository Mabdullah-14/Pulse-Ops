import React from 'react'
import { AuditLogRow } from './AuditLogsRow'

const getActionBadgeStyle = (action = '') => {
    const upper = action.toUpperCase()
    if (upper.includes('CREATE') || upper.includes('ADD')) {
        return 'bg-green-50 text-green-700 border-green-200'
    }
    if (upper.includes('DELETE') || upper.includes('REMOVE')) {
        return 'bg-red-50 text-red-700 border-red-200'
    }
    return 'bg-blue-50 text-blue-700 border-blue-200'
}

const formatMetadata = (metadata) => {
    if (!metadata || Object.keys(metadata).length === 0) return '—'
    return Object.entries(metadata)
        .map(([key, val]) => `${key}: ${val}`)
        .join(' • ')
}

export const AuditLogsTable = ({ logs = [] }) => {
    return (
        <>
            {/* Mobile Card View */}
            <div className="space-y-3 md:hidden">
                {logs.map((log) => (
                    <div
                        key={log.id}
                        className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-2xs"
                    >
                        <div className="flex items-start justify-between gap-2.5">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold uppercase text-blue-600">
                                    {log.user?.name?.charAt(0) || 'S'}
                                </div>
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-medium text-gray-900">
                                        {log.user?.name || 'System'}
                                    </div>
                                    <div className="truncate text-xs text-gray-500">
                                        {log.user?.email || '—'}
                                    </div>
                                </div>
                            </div>

                            <span
                                className={`inline-flex shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase ${getActionBadgeStyle(
                                    log.action
                                )}`}
                            >
                                {log.action?.replace(/_/g, ' ')}
                            </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-2.5 text-xs">
                            <span className="rounded-md bg-gray-100 px-2 py-0.5 font-semibold uppercase text-gray-700">
                                {log.entityType}
                            </span>
                            <span className="text-gray-500">
                                {log.createdAt ? new Date(log.createdAt).toLocaleString() : '—'}
                            </span>
                        </div>

                        <p
                            className="mt-2 break-words text-xs text-gray-600"
                            title={formatMetadata(log.metadata)}
                        >
                            {formatMetadata(log.metadata)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Desktop / Tablet Table View */}
            <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm md:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                User
                            </th>
                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Action
                            </th>
                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Entity
                            </th>
                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Details
                            </th>
                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {logs.map((log) => (
                            <AuditLogRow key={log.id} log={log} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}