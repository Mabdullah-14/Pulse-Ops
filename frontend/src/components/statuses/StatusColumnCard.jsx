import React from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { IssueCard } from '../issues/IssueCard';

import { usePermission } from '../../hooks/usePermission'
import { PERMISSIONS } from '../../constants/Permisson'
export const StatusColumnCard = ({

    status,
    issues = [],
    projectKey,

    onEditStatus,
    onDeleteStatus,
    onOpenCreateIssue,
    onEditIssue,
    onDeleteIssue,
}) => {

    const { hasPermission } = usePermission()
    const canEditStatus = hasPermission(PERMISSIONS.STATUS_UPDATE)
    const canDeleteStatus = hasPermission(PERMISSIONS.STATUS_DELETE)

    const canCreateIssue = hasPermission(PERMISSIONS.ISSUE_CREATE)


    return (
        <div className="w-80 shrink-0 bg-gray-100/80 border border-gray-200/80 rounded-xl p-3.5 flex flex-col max-h-[calc(100vh-14rem)]">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2 min-w-0">
                    <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: status.color || '#2563eb' }}
                    />
                    <h3 className="text-sm font-bold text-gray-800 truncate uppercase tracking-wide">
                        {status.name}
                    </h3>
                    <span className="px-2 py-0.5 text-xs font-semibold bg-white text-gray-600 rounded-full border border-gray-200">
                        {issues.length}
                    </span>
                </div>

                {(canEditStatus || canDeleteStatus) && (
                    <div className="flex items-center gap-1 shrink-0">
                        {canEditStatus && (
                            <button
                                onClick={() => onEditStatus(status)}
                                title="Edit column"
                                className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-white rounded-md transition cursor-pointer"
                            >
                                <Pencil size={14} />
                            </button>
                        )}
                        {canDeleteStatus && (
                            <button
                                onClick={() => onDeleteStatus(status)}
                                title="Delete column"
                                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-white rounded-md transition cursor-pointer"
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                )}

            </div>

            {/* Column Body: Issues List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
                {issues.length === 0 ? (
                    <div className="border border-dashed border-gray-300 rounded-lg py-8 px-3 text-center">
                        <p className="text-xs text-gray-400">No issues in {status.name}</p>
                    </div>
                ) : (
                    issues.map((issue) => (
                        <IssueCard
                            key={issue.id}
                            issue={issue}
                            projectKey={projectKey}
                            onEdit={onEditIssue}
                            onDelete={onDeleteIssue}
                        />
                    ))
                )}
            </div>

            {
                canCreateIssue && (
                    <button
                        onClick={() => onOpenCreateIssue(status.id)}
                        className="mt-3 w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition cursor-pointer"
                    >
                        <Plus size={14} />
                        Add Issue
                    </button>
                )
            }
        </div>
    );
};
