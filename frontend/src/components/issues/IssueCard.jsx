import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { IssuePriorityBadge } from './IssuePriority';
import { usePermission } from '../../hooks/usePermission';
import { useAuth } from '../../../context/AuthContext';
import { PERMISSIONS } from '../../constants/Permisson';

export const IssueCard = ({ issue, projectKey, onEdit, onDelete }) => {
    const { hasPermission } = usePermission();
    const { user } = useAuth();

    const canEditIssue =
        hasPermission(PERMISSIONS.ISSUE_UPDATE_ANY) ||
        (hasPermission(PERMISSIONS.ISSUE_UPDATE_OWN) &&
            issue.assigneeId === user?.id);

    const canDeleteIssue = hasPermission(PERMISSIONS.ISSUE_DELETE);

    return (
        <div
            onClick={() => canEditIssue && onEdit(issue)}
            className={`group min-w-0 rounded-lg border border-gray-200 bg-white p-3 shadow-2xs transition hover:border-blue-400 hover:shadow-sm sm:p-3.5 ${canEditIssue ? 'cursor-pointer' : 'cursor-default'
                }`}
        >
            <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="truncate text-[11px] font-semibold uppercase text-gray-400">
                    {projectKey
                        ? `${projectKey}-${issue.issueNumber || issue.id?.slice(0, 4)}`
                        : 'ISSUE'}
                </span>

                <div className="flex shrink-0 items-center gap-1.5">
                    <IssuePriorityBadge priority={issue.priority} />

                    {(canEditIssue || canDeleteIssue) && (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="ml-0.5 flex items-center gap-0.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
                        >
                            {canEditIssue && (
                                <button
                                    type="button"
                                    onClick={() => onEdit(issue)}
                                    title="Edit Issue"
                                    className="cursor-pointer rounded p-1 text-gray-400 transition hover:text-blue-600"
                                >
                                    <Pencil size={13} />
                                </button>
                            )}
                            {canDeleteIssue && (
                                <button
                                    type="button"
                                    onClick={() => onDelete(issue)}
                                    title="Delete Issue"
                                    className="cursor-pointer rounded p-1 text-gray-400 transition hover:text-red-600"
                                >
                                    <Trash2 size={13} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <h4 className="line-clamp-2 break-words text-sm font-medium text-gray-900 transition group-hover:text-blue-600">
                {issue.title}
            </h4>

            {issue.assignee && (
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-2 text-xs text-gray-500">
                    <span className="min-w-0 truncate">
                        {issue.assignee.name || issue.assignee.email}
                    </span>
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-600 text-[10px] font-bold uppercase text-white">
                        {(issue.assignee.name || issue.assignee.email || 'U').slice(0, 2)}
                    </span>
                </div>
            )}
        </div>
    );
};