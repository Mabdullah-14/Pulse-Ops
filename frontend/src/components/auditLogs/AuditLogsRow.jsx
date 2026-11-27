import React from 'react'

export const AuditLogRow = ({ log }) => {
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

    return (
        <tr className="transition hover:bg-gray-50">
            {/* Performed By (User) */}
            <td className="px-6 py-4">
                <div className="flex min-w-0 items-center gap-3">
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
            </td>

            {/* Action Badge */}
            <td className="px-6 py-4">
                <span
                    className={`inline-flex shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase ${getActionBadgeStyle(
                        log.action
                    )}`}
                >
                    {log.action?.replace(/_/g, ' ')}
                </span>
            </td>

            {/* Entity Type */}
            <td className="px-6 py-4">
                <span className="inline-flex whitespace-nowrap rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold uppercase text-gray-700">
                    {log.entityType}
                </span>
            </td>

            {/* Details (Metadata) */}
            <td
                className="max-w-xs truncate px-6 py-4 text-xs text-gray-600"
                title={formatMetadata(log.metadata)}
            >
                {formatMetadata(log.metadata)}
            </td>

            {/* Timestamp */}
            <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500">
                {log.createdAt ? new Date(log.createdAt).toLocaleString() : '—'}
            </td>
        </tr>
    )
}