import React from 'react'

export const AuditLogsEmptyState = () => {
    return (
        <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No activity logs yet</h3>
            <p className="text-sm text-gray-500">
                Actions performed across projects, roles, and members will appear here.
            </p>
        </div>
    )
}
