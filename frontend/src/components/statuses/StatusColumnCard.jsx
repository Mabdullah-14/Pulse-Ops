import React from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { IssueCard } from '../issues/IssueCard';
import { usePermission } from '../../hooks/usePermission';
import { PERMISSIONS } from '../../constants/Permisson';

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
    const { hasPermission } = usePermission();
    const canEditStatus = hasPermission(PERMISSIONS.STATUS_UPDATE);
    const canDeleteStatus = hasPermission(PERMISSIONS.STATUS_DELETE);
    const canCreateIssue = hasPermission(PERMISSIONS.ISSUE_CREATE);

    return (
        <div className="flex max-h-[75dvh] w-[272px] shrink-0 flex-col rounded-xl border border-gray-200/80 bg-gray-100/80 p-3 sm:max-h-[calc(100vh-14rem)] sm:w-80 sm:p-3.5">
            {/* Column Header */}
            <div className="mb-2.5 flex items-center justify-between gap-2 px-0.5 sm:mb-3 sm:px-1">
                <div className="flex min-w-0 items-center gap-2">
                    <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: status.color || '#2563eb' }}
                    />
                    <h3 className="truncate text-xs font-bold uppercase tracking-wide text-gray-800 sm:text-sm">
                        {status.name}
                    </h3>
                </div>

                {(canEditStatus || canDeleteStatus) && (
                    <div className="flex shrink-0 items-center gap-1">
                        {canEditStatus && (
                            <button
                                onClick={() => onEditStatus(status)}
                                title="Edit column"
                                className="cursor-pointer rounded-md p-1.5 text-gray-500 transition hover:bg-white hover:text-blue-600"
                            >
                                <Pencil size={14} />
                            </button>
                        )}
                        {canDeleteStatus && (
                            <button
                                onClick={() => onDeleteStatus(status)}
                                title="Delete column"
                                className="cursor-pointer rounded-md p-1.5 text-gray-500 transition hover:bg-white hover:text-red-600"
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {canCreateIssue && (
                <button
                    onClick={() => onOpenCreateIssue(status.id)}
                    className="mb-3 mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent py-2 text-xs font-medium text-gray-600 transition hover:border-gray-200 hover:bg-white hover:text-blue-600 sm:mb-4 sm:mt-2"
                >
                    <Plus size={14} />
                    Add Issue
                </button>
            )}

            {/* Column Body: Droppable Area */}
            <Droppable droppableId={status.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[120px] flex-1 space-y-2.5 overflow-y-auto rounded-lg pr-0.5 transition-colors sm:space-y-3 ${snapshot.isDraggingOver ? 'bg-blue-50/70 p-1 ring-2 ring-blue-300/60' : ''
                            }`}
                    >
                        {issues.length === 0 && !snapshot.isDraggingOver ? (
                            <div className="rounded-lg border border-dashed border-gray-300 px-3 py-7 text-center sm:py-8">
                                <p className="text-xs text-gray-400">No issues in {status.name}</p>
                            </div>
                        ) : (
                            issues.map((issue, index) => (
                                <Draggable key={issue.id} draggableId={issue.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`touch-none transition-shadow ${snapshot.isDragging ? 'rotate-1 opacity-95 shadow-xl' : ''
                                                }`}
                                        >
                                            <IssueCard
                                                issue={issue}
                                                projectKey={projectKey}
                                                onEdit={onEditIssue}
                                                onDelete={onDeleteIssue}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};