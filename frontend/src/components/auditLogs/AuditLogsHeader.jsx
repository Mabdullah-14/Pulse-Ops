import React from 'react'

export const AuditLogsHeader = () => {
    return (
        <div className="mb-5 border-b border-gray-200 pb-4 sm:mb-6">
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Audit Logs
            </h1>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Track all activity, role updates, and workspace changes
            </p>
        </div>
    )
}