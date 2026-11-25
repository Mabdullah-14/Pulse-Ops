import React from 'react'
import { AuditLogRow } from './AuditLogsRow'
export const AuditLogsTable = ({ logs = [] }) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
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
    )
}
