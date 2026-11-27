import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { StatusColumnCard } from './StatusColumnCard';

export const StatusColumnList = ({
    statuses = [],
    issues = [],
    onMoveIssue,
    projectKey,
    onEditStatus,
    onDeleteStatus,
    onOpenCreateIssue,
    onEditIssue,
    onDeleteIssue,
}) => {
    const sortedStatuses = [...statuses].sort(
        (a, b) => (a.position ?? 0) - (b.position ?? 0)
    );

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId) return;

        const movedIssue = issues.find((i) => String(i.id) === String(draggableId));
        if (!movedIssue) return;

        onMoveIssue({
            issueId: movedIssue.id,
            statusId: destination.droppableId,
            version: movedIssue.version,
        });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex min-w-0 items-start gap-3 overflow-x-auto overscroll-x-contain pb-4 sm:gap-4">
                {sortedStatuses.map((status) => {
                    const columnIssues = issues.filter(
                        (issue) => String(issue.statusId) === String(status.id)
                    );

                    return (
                        <StatusColumnCard
                            key={status.id}
                            status={status}
                            issues={columnIssues}
                            projectKey={projectKey}
                            onEditStatus={onEditStatus}
                            onDeleteStatus={onDeleteStatus}
                            onOpenCreateIssue={onOpenCreateIssue}
                            onEditIssue={onEditIssue}
                            onDeleteIssue={onDeleteIssue}
                        />
                    );
                })}
            </div>
        </DragDropContext>
    );
};