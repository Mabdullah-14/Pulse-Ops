import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { IssuePriorityBadge } from './IssuePriority';
export const IssueCard = ({ issue, projectKey, onEdit, onDelete }) => {
    return (
        <div
            onClick={() => onEdit(issue)}
            className="bg-white p-3.5 rounded-lg border border-gray-200 shadow-2xs hover:border-blue-400 hover:shadow-sm transition cursor-pointer group"
        >
            <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-semibold text-gray-400 uppercase">
                    {projectKey ? `${projectKey}-${issue.issueNumber || issue.id?.slice(0, 4)}` : 'ISSUE'}
                </span>

                <div className="flex items-center gap-1.5">
                    <IssuePriorityBadge priority={issue.priority} />

                    {/* Hover par Edit/Delete icons */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="hidden group-hover:flex items-center gap-0.5 ml-1"
                    >
                        <button
                            type="button"
                            onClick={() => onEdit(issue)}
                            title="Edit Issue"
                            className="p-1 text-gray-400 hover:text-blue-600 rounded transition cursor-pointer"
                        >
                            <Pencil size={13} />
                        </button>
                        <button
                            type="button"
                            onClick={() => onDelete(issue)}
                            title="Delete Issue"
                            className="p-1 text-gray-400 hover:text-red-600 rounded transition cursor-pointer"
                        >
                            <Trash2 size={13} />
                        </button>
                    </div>
                </div>
            </div>

            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
                {issue.title}
            </h4>

            {issue.assignee && (
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="truncate">{issue.assignee.name || issue.assignee.email}</span>
                    <span className="h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-bold grid place-items-center uppercase">
                        {(issue.assignee.name || issue.assignee.email || 'U').slice(0, 2)}
                    </span>
                </div>
            )}
        </div>
    );
};
