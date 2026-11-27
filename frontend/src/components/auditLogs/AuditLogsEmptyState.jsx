import React from 'react'

export const AuditLogsEmptyState = () => {
    return (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center sm:px-6 sm:py-16">
            <h3 className="mb-1 text-base font-semibold text-gray-900 sm:text-lg">
                No activity logs yet
            </h3>
            <p className="mx-auto max-w-md text-xs text-gray-500 sm:text-sm">
                Actions performed across projects, roles, and members will appear here.
            </p>
        </div>
    )
}