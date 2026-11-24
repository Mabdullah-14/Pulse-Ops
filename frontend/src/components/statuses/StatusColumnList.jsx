import React from 'react';
import { StatusColumnCard } from './StatusColumnCard';

export const StatusColumnList = ({ statuses, issues = [], onEditStatus, onDeleteStatus, onOpenCreateIssue, onEditIssue, onDeleteIssue }) => {
    const sortedStatuses = [...statuses].sort((a, b) => (a.position) - (b.position));

    return (
        <div className="flex items-start gap-4 overflow-x-auto pb-4">
            {sortedStatuses.map((status) => {
                const columnIssues = issues.filter((issue) => issue.statusId === status.id);

                return (
                    <StatusColumnCard
                        key={status.id}
                        status={status}
                        issues={columnIssues}

                        onEditStatus={onEditStatus}
                        onDeleteStatus={onDeleteStatus}
                        onOpenCreateIssue={onOpenCreateIssue}
                        onEditIssue={onEditIssue}
                        onDeleteIssue={onDeleteIssue}
                    />
                );
            })}
        </div>
    );
};
